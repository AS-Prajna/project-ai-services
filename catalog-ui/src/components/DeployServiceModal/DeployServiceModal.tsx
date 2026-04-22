import { useState, useEffect } from "react";
import {
  TextInput,
  Grid,
  Column,
  Tag,
  Button,
  ProgressIndicator,
  ProgressStep,
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

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Deploy service</h1>
        <Tag type="gray" className={styles.pageBadge}>{serviceName}</Tag>
      </header>

      <div className={styles.pageBody}>
        <aside className={styles.pageLeft}>
          <ProgressIndicator vertical currentIndex={0}>
            <ProgressStep label="Provide name and view requirements" />
            <ProgressStep label="Configure service" />
            <ProgressStep label="Ingest data (optional)" />
          </ProgressIndicator>
        </aside>

        <main className={styles.pageRight}>
          <h4 className={styles.sectionTitle}>Provide name and resources</h4>

          <div className={styles.contentInner}>
            <Grid className={styles.resourceGrid}>
              <Column lg={8} md={6} sm={4}>
                <TextInput
                  id="deployment-name"
                  labelText="Deployment name"
                  style={{ backgroundColor: "var(--cds-layer-02)" }}
                  value={deploymentData.deploymentName}
                  onChange={(e) => setDeploymentData({ ...deploymentData, deploymentName: e.target.value })}
                />
              </Column>
            </Grid>

            <Grid className={styles.resourceGrid}>
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
        </main>
      </div>

      <footer className={styles.pageFooter}>
        <Button kind="ghost" onClick={onClose}>Cancel</Button>
        <Button kind="secondary" disabled>Back</Button>
        <Button kind="primary" onClick={handleSubmit}>Next</Button>
      </footer>
    </div>
  </div>
</div>
  );
};

export default DeployServiceModal;

