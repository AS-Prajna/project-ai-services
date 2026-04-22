import { useState } from "react";
import { CreateTearsheet, CreateTearsheetStep } from "@carbon/ibm-products";
import {
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Grid,
  Column,
  Tag,
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
        title="Provide name and resources"
        hasFieldset={false}
      >
         <div style={{ padding: "2rem" }}>
    

      {/* Deployment Name */}
      <Grid>
        <Column lg={8} md={6} sm={4}>
          <TextInput
            id="deployment-name"
            labelText="Deployment name"
            defaultValue="Digitize documents"
          />
        </Column>
      </Grid>

      {/* Resources Section */}
      <Grid style={{ marginTop: "2rem" }}>
        {/* vCPU */}
        <Column lg={4} md={4} sm={4}>
          <NumberInput
            id="vcpu"
            label="vCPU cores"
            min={0}
            step={0.1}
            defaultValue={0.2}
          />

          <div style={{ marginTop: "0.5rem" }}>
            <span>Available cores </span>
            <Tag type="green">12.98</Tag>
          </div>
        </Column>

        {/* Memory */}
        <Column lg={4} md={4} sm={4}>
          <p style={{ marginBottom: "0.5rem" }}>Required memory</p>
          <strong>10.00 GB</strong>

          <div style={{ marginTop: "0.5rem" }}>
            <span>Available memory </span>
            <Tag >30.00 GB</Tag>
          </div>
        </Column>

        {/* I/O */}
        <Column lg={4} md={4} sm={4}>
          <p style={{ marginBottom: "0.5rem" }}>Required Spyre I/O</p>
          <strong>4</strong>

          <div style={{ marginTop: "0.5rem" }}>
            <span>Available cores </span>
            <Tag type="green">8</Tag>
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

