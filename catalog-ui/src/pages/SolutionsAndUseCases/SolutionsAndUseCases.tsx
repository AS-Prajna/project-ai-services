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
import { SolutionCard } from "@/components";
import styles from "./SolutionsAndUseCases.module.scss";
import { ACTION_TYPES, INITIAL_STATE, pageReducer } from "./types";

const SolutionsAndUseCasesPage = () => {
  const [state, dispatch] = useReducer(pageReducer, INITIAL_STATE);

  const handleDomainChange = (checked: boolean, value: string) => {
    const newDomains = checked
      ? [...state.filters.domains, value]
      : state.filters.domains.filter((d) => d !== value);
    dispatch({
      type: ACTION_TYPES.SET_DOMAIN_FILTER,
      payload: newDomains,
    });
  };

  const handleAssetChange = (checked: boolean, value: string) => {
    const newAssets = checked
      ? [...state.filters.assets, value]
      : state.filters.assets.filter((a) => a !== value);
    dispatch({
      type: ACTION_TYPES.SET_ASSET_FILTER,
      payload: newAssets,
    });
  };

  const filteredItems = state.items.filter((item) => {
    const matchesSearch =
      state.search === "" ||
      item.title.toLowerCase().includes(state.search.toLowerCase()) ||
      item.description.toLowerCase().includes(state.search.toLowerCase());

    const matchesDomain =
      state.filters.domains.length === 0 ||
      (item.domain && state.filters.domains.includes(item.domain));

    return matchesSearch && matchesDomain;
  });

  return (
    <>
      <PageHeader
        title={{ text: "Solutions and use cases" }}
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
                <AccordionItem title="Domains" open>
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="IT Ops"
                      id="domain-it-ops"
                      checked={state.filters.domains.includes("IT Ops")}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "IT Ops")
                      }
                    />
                    <Checkbox
                      labelText="Customer service"
                      id="domain-customer"
                      checked={state.filters.domains.includes(
                        "Customer service",
                      )}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "Customer service")
                      }
                    />
                    <Checkbox
                      labelText="Development operations"
                      id="domain-dev-ops"
                      checked={state.filters.domains.includes(
                        "Development operations",
                      )}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "Development operations")
                      }
                    />
                    <Checkbox
                      labelText="Enterprise search"
                      id="domain-enterprise"
                      checked={state.filters.domains.includes(
                        "Enterprise search",
                      )}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "Enterprise search")
                      }
                    />
                    <Checkbox
                      labelText="Healthcare"
                      id="domain-healthcare"
                      checked={state.filters.domains.includes("Healthcare")}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "Healthcare")
                      }
                    />
                    <Checkbox
                      labelText="Public"
                      id="domain-public"
                      checked={state.filters.domains.includes("Public")}
                      onChange={(_, { checked }) =>
                        handleDomainChange(checked, "Public")
                      }
                    />
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem title="Assets">
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="Video demos"
                      id="asset-video"
                      checked={state.filters.assets.includes("Video demos")}
                      onChange={(_, { checked }) =>
                        handleAssetChange(checked, "Video demos")
                      }
                    />
                    <Checkbox
                      labelText="Interactive prototypes"
                      id="asset-interactive"
                      checked={state.filters.assets.includes(
                        "Interactive prototypes",
                      )}
                      onChange={(_, { checked }) =>
                        handleAssetChange(checked, "Interactive prototypes")
                      }
                    />
                    <Checkbox
                      labelText="Reference stories"
                      id="asset-reference"
                      checked={state.filters.assets.includes(
                        "Reference stories",
                      )}
                      onChange={(_, { checked }) =>
                        handleAssetChange(checked, "Reference stories")
                      }
                    />
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem title="Reference architectures">
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="Sales and current mgmt"
                      id="ref-sales"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Digital assistant"
                      id="ref-digital"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Digital assistant"
                      id="ref-digital-2"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Fraud detection"
                      id="ref-fraud"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Financing"
                      id="ref-financing"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Recommender system"
                      id="ref-recommender"
                      checked={false}
                      onChange={() => {}}
                    />
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem title="Services">
                  <CheckboxGroup legendText="">
                    <Checkbox
                      labelText="Data and content mgmt"
                      id="service-data"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Deep process integration"
                      id="service-deep"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Digital assistant"
                      id="service-digital"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      labelText="Fraud detection"
                      id="service-fraud"
                      checked={false}
                      onChange={() => {}}
                    />
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
            </div>
          </Column>

          <Column lg={12} md={6} sm={4} className={styles.contentColumn}>
            <div className={styles.cardsGrid}>
              {filteredItems.map((item) => (
                <SolutionCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  category={item.category || "Agriculture"}
                  onExplore={(id) => console.log("Explore", id)}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className={styles.emptyState}>
                <p>No solutions found matching your criteria.</p>
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

export default SolutionsAndUseCasesPage;
