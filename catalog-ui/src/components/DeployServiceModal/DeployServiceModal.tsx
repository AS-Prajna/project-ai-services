import { useState } from "react";
import { CreateTearsheet, CreateTearsheetStep } from "@carbon/ibm-products";
import {
  TextInput,
  Select,
  SelectItem,
  Grid,
  Column,
} from "@carbon/react";
import styles from "./DeployServiceModal.module.scss";

export interface DeployServiceModalProps {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  serviceId: string;
}

interface DeploymentData {
  deploymentName: string;
  requiredCores: number;
  requiredMemory: number;
  requiredSpyreIO: number;
  deploymentSize: string;
  region: string;
  dataSourceUrl: string;
}

const DeployServiceModal = ({
  open,
  onClose,
  serviceName,
  serviceId,
}: DeployServiceModalProps) => {
  const [deploymentData, setDeploymentData] = useState<DeploymentData>({
    deploymentName: serviceName,
    requiredCores: 0.2,
    requiredMemory: 10.0,
    requiredSpyreIO: 4,
    deploymentSize: "small",
    region: "us-south",
    dataSourceUrl: "",
  });

  const handleSubmit = () => {
    console.log("Deploying service:", serviceId, deploymentData);
    onClose();
  };

  return (
    <CreateTearsheet
      open={open}
      onClose={onClose}
      title={
        <div className={styles.titleContainer}>
          <span className={styles.titleText}>Deploy service</span>
          <span className={styles.serviceBadge}>{serviceName}</span>
        </div>
      }
      
      submitButtonText="Deploy"
      nextButtonText="Next"
      cancelButtonText="Cancel"
      backButtonText="Back"
      onRequestSubmit={handleSubmit}
      className={styles.tearsheet}
    >
      <CreateTearsheetStep
        title="Provide name and view requirements"
        hasFieldset={false}
      >
         <div style={{ padding: "2rem" }}>
    

      {/* Deployment Name */}
      <Grid>
        <Column lg={8} md={6} sm={4}>
          <TextInput
            id="deployment-name"
            labelText="Deployment name"
            defaultValue={serviceName}
          />
        </Column>
      </Grid>

      {/* Resources Section */}
   <Grid className={styles.resourceGrid}>
  {/* Row 1 */}
  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Required cores</p>
      <p className={styles.value}>0.2</p>
    </div>
  </Column>

  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Available cores</p>
      <div className={styles.status}>
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.value}>12.98</span>
      </div>
    </div>
  </Column>

  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Required memory</p>
      <p className={styles.value}>10.00 GB</p>
    </div>
  </Column>

  {/* Row 2 */}
  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Available memory</p>
      <div className={styles.status}>
        <span className={styles.warningTriangle} />
        <span className={styles.value}>30.00 GB</span>
      </div>
    </div>
  </Column>

  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Required Spyre I/O</p>
      <p className={styles.value}>4</p>
    </div>
  </Column>

  <Column lg={4} md={4} sm={4}>
    <div className={styles.item}>
      <p className={styles.label}>Available cores</p>
      <div className={styles.status}>
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.value}>8</span>
      </div>
    </div>
  </Column>
</Grid>
    </div>
      </CreateTearsheetStep>

      <CreateTearsheetStep
        title="Configure service"
        subtitle="Choose deployment options before you continue."
        hasFieldset={false}
      >
        <div className={styles.stepHeader}>
          <h3 className={styles.stepTitle}>Configure service</h3>
        </div>

        <div className={styles.formSection}>
          <Select
            id="deployment-size"
            labelText="Deployment size"
            value={deploymentData.deploymentSize}
            onChange={(e) =>
              setDeploymentData({
                ...deploymentData,
                deploymentSize: e.target.value,
              })
            }
          >
            <SelectItem value="small" text="Small" />
            <SelectItem value="medium" text="Medium" />
            <SelectItem value="large" text="Large" />
          </Select>
        </div>

        <div className={styles.formSection}>
          <Select
            id="deployment-region"
            labelText="Deployment region"
            value={deploymentData.region}
            onChange={(e) =>
              setDeploymentData({
                ...deploymentData,
                region: e.target.value,
              })
            }
          >
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="eu-gb" text="Europe UK" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
      </CreateTearsheetStep>

      <CreateTearsheetStep
        title="Ingest data"
        subtitle="Optional data sources can be connected after deployment."
        hasFieldset={false}
      >
        <div className={styles.stepHeader}>
          <h3 className={styles.stepTitle}>Ingest data</h3>
          <p className={styles.stepSubtitle}>(optional)</p>
        </div>

        <p className={styles.optionalStepText}>
          Use this step to optionally attach a data source or document repository
          to the deployed service.
        </p>

        <div className={styles.formSection}>
          <TextInput
            id="data-source-url"
            labelText="Data source URL (optional)"
            placeholder="https://example.com/data"
            value={deploymentData.dataSourceUrl}
            onChange={(e) =>
              setDeploymentData({
                ...deploymentData,
                dataSourceUrl: e.target.value,
              })
            }
          />
        </div>
      </CreateTearsheetStep>
    </CreateTearsheet>
  );
};

export default DeployServiceModal;

