import { useReducer } from "react";
import { PageHeader } from "@carbon/ibm-products";
import {
  Grid,
  Column,
  Search,
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Button,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { CatalogCard } from "@/components";
import styles from "./Services.module.scss";
import { ACTION_TYPES, INITIAL_STATE, pageReducer } from "./types";

const ServicesPage = () => {
  const [state, dispatch] = useReducer(pageReducer, INITIAL_STATE);

  const handleProviderChange = (checked: boolean, value: string) => {
    const newProviders = checked
      ? [...state.filters.providers, value]
      : state.filters.providers.filter((p) => p !== value);
    dispatch({
      type: ACTION_TYPES.SET_PROVIDER_FILTER,
      payload: newProviders,
    });
  };

  const handleReferenceArchitectureChange = (
    checked: boolean,
    value: string,
  ) => {
    const newArchitectures = checked
      ? [...state.filters.referenceArchitectures, value]
      : state.filters.referenceArchitectures.filter((a) => a !== value);
    dispatch({
      type: ACTION_TYPES.SET_REFERENCE_ARCHITECTURE_FILTER,
      payload: newArchitectures,
    });
  };

  const filteredItems = state.items.filter((item) => {
    const matchesSearch =
      state.search === "" ||
      item.title.toLowerCase().includes(state.search.toLowerCase()) ||
      item.description.toLowerCase().includes(state.search.toLowerCase());

    const matchesProvider =
      state.filters.providers.length === 0 ||
      (item.provider && state.filters.providers.includes(item.provider));

    return matchesSearch && matchesProvider;
  });

  return (
    <>
      <PageHeader
        title={{ text: "Services" }}
        subtitle="Pre-built AI demos from real-world use cases to help you envision how AI can solve common business problems."
        pageActions={[
          {
            key: "learn-more",
            kind: "tertiary",
            label: "Learn more",
            renderIcon: ArrowRight,
            onClick: () => {
              window.open(
                "https://www.ibm.com/docs/en/aiservices?topic=services-introduction",
                "_blank",
              );
            },
          },
        ]}
        pageActionsOverflowLabel="More actions"
        fullWidthGrid="xl"
      />

      <div className={styles.pageContent}>
        <Grid fullWidth>
          <Column lg={4} md={2} sm={4} className={styles.sidebarColumn}>
            <div className={styles.sidebar}>
              <Search
                placeholder="Search"
                labelText="Search"
                value={state.search}
                onChange={(e) =>
                  dispatch({
                    type: ACTION_TYPES.SET_SEARCH,
                    payload: e.target.value,
                  })
                }
                size="lg"
              />

              <Accordion>
                <AccordionItem title="Provider" open>
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="IBM"
                      id="provider-ibm"
                      checked={state.filters.providers.includes("IBM")}
                      onChange={(_, { checked }) =>
                        handleProviderChange(checked, "IBM")
                      }
                    />
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem title="Reference architectures">
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="Data and content mgmt"
                      id="arch-data"
                      checked={state.filters.referenceArchitectures.includes(
                        "Data and content mgmt",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Data and content mgmt",
                        )
                      }
                    />
                    <Checkbox
                      labelText="Deep process integration"
                      id="arch-deep"
                      checked={state.filters.referenceArchitectures.includes(
                        "Deep process integration",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Deep process integration",
                        )
                      }
                    />
                    <Checkbox
                      labelText="Digital assistant"
                      id="arch-digital"
                      checked={state.filters.referenceArchitectures.includes(
                        "Digital assistant",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Digital assistant",
                        )
                      }
                    />
                    <Checkbox
                      labelText="Fraud detection"
                      id="arch-fraud"
                      checked={state.filters.referenceArchitectures.includes(
                        "Fraud detection",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Fraud detection",
                        )
                      }
                    />
                    <Checkbox
                      labelText="Image and video analysis"
                      id="arch-image"
                      checked={state.filters.referenceArchitectures.includes(
                        "Image and video analysis",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Image and video analysis",
                        )
                      }
                    />
                    <Checkbox
                      labelText="Recommender system"
                      id="arch-recommender"
                      checked={state.filters.referenceArchitectures.includes(
                        "Recommender system",
                      )}
                      onChange={(_, { checked }) =>
                        handleReferenceArchitectureChange(
                          checked,
                          "Recommender system",
                        )
                      }
                    />
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
            </div>
          </Column>

          <Column lg={12} md={6} sm={4} className={styles.contentColumn}>
            <div className={styles.cardsGrid}>
              {filteredItems.map((item) => (
                <CatalogCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  category={item.category}
                  onDeploy={(id) => console.log("Deploy", id)}
                  onLearnMore={(id) => console.log("Learn more", id)}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className={styles.emptyState}>
                <p>No services found matching your criteria.</p>
                <Button
                  kind="tertiary"
                  onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_FILTERS })}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </Column>
        </Grid>
      </div>
    </>
  );
};

export default ServicesPage;
