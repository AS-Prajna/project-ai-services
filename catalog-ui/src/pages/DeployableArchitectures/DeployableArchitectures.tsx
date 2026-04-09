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
import styles from "./DeployableArchitectures.module.scss";
import { ACTION_TYPES, INITIAL_STATE, pageReducer } from "./types";

const DeployableArchitecturesPage = () => {
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

  const handleServiceChange = (checked: boolean, value: string) => {
    const newServices = checked
      ? [...state.filters.services, value]
      : state.filters.services.filter((s) => s !== value);
    dispatch({
      type: ACTION_TYPES.SET_SERVICE_FILTER,
      payload: newServices,
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
        title={{ text: "Deployable architectures" }}
        subtitle="Production-ready AI solutions"
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
                    <Checkbox
                      labelText="IBM certified (any provider)"
                      id="provider-ibm-certified"
                      checked={state.filters.providers.includes(
                        "IBM certified",
                      )}
                      onChange={(_, { checked }) =>
                        handleProviderChange(checked, "IBM certified")
                      }
                    />
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem title="Services">
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="Digitize documents"
                      id="service-digitize"
                      checked={state.filters.services.includes(
                        "Digitize documents",
                      )}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Digitize documents")
                      }
                    />
                    <Checkbox
                      labelText="Extract and tag info"
                      id="service-extract"
                      checked={state.filters.services.includes(
                        "Extract and tag info",
                      )}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Extract and tag info")
                      }
                    />
                    <Checkbox
                      labelText="Find similar items"
                      id="service-similar"
                      checked={state.filters.services.includes(
                        "Find similar items",
                      )}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Find similar items")
                      }
                    />
                    <Checkbox
                      labelText="Knowledge management"
                      id="service-knowledge"
                      checked={state.filters.services.includes(
                        "Knowledge management",
                      )}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Knowledge management")
                      }
                    />
                    <Checkbox
                      labelText="Question and answer"
                      id="service-qa"
                      checked={state.filters.services.includes(
                        "Question and answer",
                      )}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Question and answer")
                      }
                    />
                    <Checkbox
                      labelText="Translation"
                      id="service-translation"
                      checked={state.filters.services.includes("Translation")}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Translation")
                      }
                    />
                    <Checkbox
                      labelText="Summarization"
                      id="service-summarization"
                      checked={state.filters.services.includes("Summarization")}
                      onChange={(_, { checked }) =>
                        handleServiceChange(checked, "Summarization")
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
                  isCertified={item.isCertified}
                  onDeploy={(id) => console.log("Deploy", id)}
                  onLearnMore={(id) => console.log("Learn more", id)}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className={styles.emptyState}>
                <p>No architectures found matching your criteria.</p>
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

export default DeployableArchitecturesPage;
