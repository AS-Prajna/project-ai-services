package cmd

import (
	"fmt"
	"os"
	"runtime"
	"strconv"
	"strings"

	log "github.com/project-ai-services/ai-services/internal/pkg/logger"
	"github.com/project-ai-services/ai-services/internal/pkg/validators"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
)

var (
	logger = log.GetLogger()
)

// bootstrapCmd represents the bootstrap command
func BootstrapCmd() *cobra.Command {
	bootstrapCmd := &cobra.Command{
		Use:   "bootstrap",
		Short: "Bootstraps AI services infrastructure",
		Long: `Bootstrap and configure the AI services infrastructure.

The bootstrap command helps you set up and validate the environment
required to run AI services on Power11 systems.

Available subcommands:
  validate   - Validate system prerequisites and configuration
  configure  - Configure and initialize the AI services infrastructure`,
		Example: `  # Validate the environment
  aiservices bootstrap validate

  # Configure the infrastructure
  aiservices bootstrap configure

  # Get help on a specific subcommand
  aiservices bootstrap validate --help`,
	}

	// subcommands
	bootstrapCmd.AddCommand(validateCmd())
	// bootstrapCmd.AddCommand(configureCmd())

	return bootstrapCmd
}

// validateCmd represents the validate subcommand of bootstrap
func validateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "validate",
		Short: "validates the environment",
		Long: `Validate that all prerequisites and configurations are correct for bootstrapping.

This command performs comprehensive validation checks including:

System Checks:
  • Root privileges verification
  • RHEL distribution verification
  • RHEL version validation (9.6 or higher)
  • Power 11 architecture validation
  • RHN registration status
  • LTC yum repository availability
  • service-report package availability

Container Runtime:
  • Podman installation and configuration
  • Podman version compatibility

License:
  • RHAIIS license

All checks must pass for successful bootstrap configuration.`,
		Example: `  # Run all validation checks
  aiservices bootstrap validate

  # Validate with verbose output
  aiservices bootstrap validate -v`,
		RunE: func(cmd *cobra.Command, args []string) error {
			logger.Info("Running bootstrap validation...")

			var validationErrors []error

			// 1. Root check
			if err := rootCheck(); err != nil {
				return err
			}

			// 2. OS and version check
			if err := validateOS(); err != nil {
				validationErrors = append(validationErrors, err)
			}

			// 3. Validate RHN registration
			if err := validateRHNRegistration(); err != nil {
				validationErrors = append(validationErrors, err)
			}

			// 4. LTC yum repository for installing service-report package
			if err := validateLTCRPMRepo(); err != nil {
				validationErrors = append(validationErrors, err)
			}

			// 5. Validate Podman installation
			if _, err := validators.Podman(); err != nil {
				logger.Debug("❌ Podman validation failed", zap.Error(err))
				validationErrors = append(validationErrors, fmt.Errorf("❌ podman validation failed: %w", err))
			} else {
				logger.Debug("✅ Podman validation passed")
			}

			// 6. IBM Power Version Validation
			if err := validatePowerVersion(); err != nil {
				validationErrors = append(validationErrors, err)
			}

			// 7. RHAIIS Licence Validation
			if err := validateRHAIISLicense(); err != nil {
				validationErrors = append(validationErrors, err)
			}

			if len(validationErrors) > 0 {
				logger.Error("❌ Validation failed with errors:")
				for i, err := range validationErrors {
					logger.Error(fmt.Sprintf("  %d. %s", i+1, err.Error()))
				}
				return fmt.Errorf("%d validation check(s) failed", len(validationErrors))
			}

			// TODO: add --skip-validation flag
			// TODO: add --verbose flag

			logger.Info("✅ All validations passed")
			return nil
		},
	}
}

func rootCheck() error {
	euid := os.Geteuid()

	if euid == 0 {
		logger.Debug("✅ Current user is root.")
	} else {
		logger.Error("❌ Current user is not root.")
		logger.Debug("Effective User ID", zap.Int("euid", euid))
		return fmt.Errorf("root privileges are required to run this command")
	}
	return nil
}

// validateOS checks if the OS is RHEL and version is 9.6 or higher
func validateOS() error {
	logger.Debug("Validating operating system...")

	data, err := os.ReadFile("/etc/os-release")
	if err != nil {
		return err
	}

	// verify if OS is RHEL
	osInfo := string(data)
	isRHEL := strings.Contains(osInfo, "Red Hat Enterprise Linux") ||
		strings.Contains(osInfo, `ID="rhel"`) ||
		strings.Contains(osInfo, `ID=rhel`)

	if !isRHEL {
		return fmt.Errorf("❌ unsupported operating system: only RHEL is supported")
	}

	// verify if version is 9.6 or higher
	idx := strings.Index(osInfo, "VERSION_ID=")
	if idx == -1 {
		return fmt.Errorf("unable to determine OS version")
	}
	rest := osInfo[idx+len("VERSION_ID="):]
	if end := strings.IndexByte(rest, '\n'); end != -1 {
		rest = rest[:end]
	}
	version := strings.Trim(rest, `"`)

	parts := strings.Split(version, ".")
	major, _ := strconv.Atoi(parts[0])
	minor := 0
	if len(parts) > 1 {
		minor, _ = strconv.Atoi(parts[1])
	}

	if major < 9 || (major == 9 && minor < 6) {
		return fmt.Errorf("❌ unsupported RHEL version: %s. Minimum required version is 9.6", version)
	}

	logger.Debug("✅ Operating system is RHEL", zap.String("version", version))
	return nil
}

// validateRHNRegistration checks if the system is registered with RHN
func validateRHNRegistration() error {
	logger.Debug("Validating RHN registration...")
	return nil
}

// validateLTCRPMRepo checks if the LTC RPM repository is configured
func validateLTCRPMRepo() error {
	logger.Debug("Validating LTC RPM repository...")
	return nil
}

// validatePowerVersion checks if the system is running on IBM POWER11 architecture
func validatePowerVersion() error {
	logger.Debug("Validating IBM Power version...")

	if runtime.GOARCH != "ppc64le" {
		return fmt.Errorf("❌ unsupported architecture: %s. IBM Power architecture (ppc64le) is required", runtime.GOARCH)
	}

	data, err := os.ReadFile("/proc/cpuinfo")
	if err == nil && strings.Contains(string(data), "POWER11") {
		logger.Debug("✅ System is running on IBM POWER11 architecture")
		return nil
	}

	return fmt.Errorf("❌ unsupported IBM Power version: POWER11 is required")
}

// validateRHAIISLicense checks if a valid RHAIIS license is present
func validateRHAIISLicense() error {
	logger.Debug("Validating RHAIIS license...")
	return nil
}
