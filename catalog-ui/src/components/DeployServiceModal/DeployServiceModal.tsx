import { useState, useEffect } from "react";
import {
  TextInput,
  Grid,
  Column,
  Tag,
  Button,
  ProgressIndicator,
  ProgressStep,
  Dropdown,
  Accordion,
  AccordionItem,
} from "@carbon/react";
import styles from "./DeployServiceModal.module.scss";

export interface DeployServiceModalProps {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  serviceId: string;
  serviceDescription: string;
}

interface DeploymentData {
  deploymentName: string;
  deploymentDescription: string;
  requiredCores: number;
  requiredMemory: number;
  requiredSpyreIO: number;
  deploymentSize: string;
  region: string;
  dataSourceUrl: string;
  serviceVersion: string;
  inferenceBackend: string;
  inferenceModel: string;
  llmIngestModel: string;
  vectorStore: string;
}

const DeployServiceModal = ({
  open,
  onClose,
  serviceName,
  serviceId,
  serviceDescription,
}: DeployServiceModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentData, setDeploymentData] = useState<DeploymentData>({
    deploymentName: serviceName,
    deploymentDescription: serviceDescription,
    requiredCores: 0.2,
    requiredMemory: 10.0,
    requiredSpyreIO: 4,
    deploymentSize: "small",
    region: "us-south",
    dataSourceUrl: "",
    serviceVersion: "1.0.2",
    inferenceBackend: "redhat-ai",
    inferenceModel: "ibm-granite/granite-3.3-8b-instruct",
    llmIngestModel: "ibm-granite/granite-3.3-8b-instruct",
    vectorStore: "opensearch",
  });

  const [deploymentNameError, setDeploymentNameError] = useState<string>("");
  const [deploymentNameInvalid, setDeploymentNameInvalid] = useState(false);
  // Mock list of existing deployment names
  const existingDeploymentNames = ["deployment-1", "deployment-2", "production-rag"];

  const serviceVersions = [
    { id: "1.0.2", text: "1.0.2" },
    { id: "1.0.1", text: "1.0.1" },
    { id: "1.0.0", text: "1.0.0" },
  ];

  const inferenceBackends = [
    { id: "redhat-ai", text: "RedHat AI Inference (default)" },
    { id: "ollama", text: "Ollama" },
    { id: "vllm", text: "vLLM" },
  ];

  const modelOptions = [
    { id: "granite-3.3-8b", text: "ibm-granite/granite-3.3-8b-instruct" },
    { id: "granite-embedding", text: "ibm-granite/granite-embedding-278m-multilingual" },
    { id: "llama-3", text: "meta-llama/llama-3-8b-instruct" },
    { id: "mistral", text: "mistralai/mistral-7b-instruct" },
  ];

  const vectorStores = [
    { id: "opensearch", text: "OpenSearch (default)" },
    { id: "milvus", text: "Milvus" },
    { id: "chromadb", text: "ChromaDB" },
  ];

  const validateDeploymentName = (name: string): string => {
    if (!name || name.trim() === "") {
      return "Provide a valid name";
    }
    if (existingDeploymentNames.includes(name.toLowerCase())) {
      return "Name already exists";
    }
    return "";
  };

  const handleNameChange = (name: string) => {
    setDeploymentData({ ...deploymentData, deploymentName: name });
    const error = validateDeploymentName(name);
    setDeploymentNameError(error);
    setDeploymentNameInvalid(error !== "");
  };

  const handleSubmit = () => {
    console.log("Deploying service:", serviceId, deploymentData);
    onClose();
  };

  const handleNext = () => {
    // Validate deployment name on first step before proceeding
    if (currentStep === 0) {
      const error = validateDeploymentName(deploymentData.deploymentName);
      if (error) {
        setDeploymentNameError(error);
        setDeploymentNameInvalid(true);
        return;
      }
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      setCurrentStep(0);
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  if (!open) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h4 className={styles.sectionTitle}>Provide name and resources</h4>
            <div className={styles.contentInner}>
              <Grid className={styles.resourceGrid}>
                <Column lg={8} md={6} sm={4}>
                  <TextInput
                    id="deployment-name"
                    labelText="Deployment name"
                    style={{ backgroundColor: "var(--cds-layer-02)" }}
                    value={deploymentData.deploymentName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    invalid={deploymentNameInvalid}
                    invalidText={deploymentNameError}
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
          </>
        );

      case 1:
        return (
          <>
            <h4 className={styles.sectionTitle}>Configure services</h4>


            <div className={styles.contentInner}>
              <Accordion className={styles.configAccordion} align="start">
                <AccordionItem
                  title={
                    <div>
                      <div style={{ fontWeight: 600 }}>{deploymentData.deploymentName}</div>
                      <p>{deploymentData.deploymentDescription}</p>
                    </div>

                  } open
                >

                  <div className={styles.configFormGrid}>
                    <div className={styles.configRow}>
                      <div className={styles.configField}>
                        <Dropdown
                          id="service-version"
                          titleText="Service version"
                          label="Select version"
                          items={serviceVersions}
                          itemToString={(item) => (item ? item.text : "")}
                          selectedItem={serviceVersions.find(v => v.id === deploymentData.serviceVersion)}
                          onChange={({ selectedItem }) =>
                            setDeploymentData({ ...deploymentData, serviceVersion: selectedItem?.id || "" })
                          }
                        />
                      </div>

                      <div className={styles.configField}>
                        <Dropdown
                          id="vector-store"
                          titleText="Vector store"
                          label="Select store"
                          items={vectorStores}
                          itemToString={(item) => (item ? item.text : "")}
                          selectedItem={vectorStores.find(v => v.id === deploymentData.vectorStore)}
                          onChange={({ selectedItem }) =>
                            setDeploymentData({ ...deploymentData, vectorStore: selectedItem?.id || "" })
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.configRow}>
                      <div className={styles.configField}>
                        <Dropdown
                          id="inference-model"
                          titleText="Inference model"
                          label="Select model"
                          items={modelOptions}
                          itemToString={(item) => (item ? item.text : "")}
                          selectedItem={modelOptions.find(m => m.text === deploymentData.inferenceModel)}
                          onChange={({ selectedItem }) =>
                            setDeploymentData({ ...deploymentData, inferenceModel: selectedItem?.text || "" })
                          }
                        />
                      </div>

                      <div className={styles.configField}>
                        <Dropdown
                          id="inference-backend"
                          titleText="Inference backend"
                          label="Select backend"
                          items={inferenceBackends}
                          itemToString={(item) => (item ? item.text : "")}
                          selectedItem={inferenceBackends.find(b => b.id === deploymentData.inferenceBackend)}
                          onChange={({ selectedItem }) =>
                            setDeploymentData({ ...deploymentData, inferenceBackend: selectedItem?.id || "" })
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.configRow}>
                      <div className={styles.configField}>
                        <Dropdown
                          id="llm-ingest-model"
                          titleText="LLM ingest model (cannot be changed after deployment)"
                          label="Select model"
                          items={modelOptions}
                          itemToString={(item) => (item ? item.text : "")}
                          selectedItem={modelOptions.find(m => m.text === deploymentData.llmIngestModel)}
                          helperText="For data recognition and categorization during digitization"
                          onChange={({ selectedItem }) =>
                            setDeploymentData({ ...deploymentData, llmIngestModel: selectedItem?.id || "" })
                          }
                        />
                      </div>
                      <div />
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h4 className={styles.sectionTitle}>Provide name and adjust resources</h4>
            <div className={styles.contentInner}>
             
              <Grid className={styles.resourceGrid}>
                <Column lg={8} md={6} sm={4}>
                
                </Column>
              </Grid>
            </div>
          </>
        );

      default:
        return null;
    }
  };

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
              <ProgressIndicator vertical currentIndex={currentStep}>
                <ProgressStep label="Provide name and view requirements" />
                <ProgressStep label="Configure service" />
                <ProgressStep label="Ingest data (optional)" />
              </ProgressIndicator>
            </aside>

            <main className={styles.pageRight}>
              {renderStepContent()}
            </main>
          </div>

          <footer className={styles.pageFooter}>
            <Button style={{ }} kind="ghost" onClick={onClose}>Cancel</Button>
            <Button kind="secondary" disabled={currentStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button kind="primary" onClick={handleNext}>
              {currentStep === 2 ? "Deploy" : "Next"}
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DeployServiceModal;

