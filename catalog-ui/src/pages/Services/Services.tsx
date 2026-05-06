import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AccordionItem, Checkbox } from "@carbon/react";
import CatalogBrowseLayout from "@/layouts/CatalogBrowseLayout";
import { ServiceCard } from "@/components";

// Mock data
const mockServices = [
  {
    id: "1",
    title: "Digitize documents",
    description:
      "Transforms documents such as manuals, invoices, and forms into text.",
    tags: ["Digital assistant", "Fraud detection"],
    provider: "IBM",
    isCertified: true,
  },
  {
    id: "2",
    title: "Find similar items",
    description:
      "Fetches similar items from the system's knowledge management for a given input text or file.",
    tags: ["Digital assistant"],
    provider: "IBM",
    isCertified: false,
  },
  {
    id: "3",
    title: "Question and answer",
    description:
      "Answers questions in natural language by sourcing generic & domain-specific knowledge.",
    tags: ["Digital assistant", "Deep process integration"],
    provider: "IBM",
    isCertified: false,
  },
  {
    id: "4",
    title: "Summarization",
    description:
      "Consolidates a longer input text into a brief statement or account of the main points.",
    tags: ["Digital assistant", "Fraud detection"],
    provider: "IBM",
    isCertified: false,
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedArchitectures, setSelectedArchitectures] = useState<string[]>(
    [],
  );

  const handleProviderChange = (checked: boolean, value: string) => {
    setSelectedProviders((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value),
    );
  };

  const handleArchitectureChange = (checked: boolean, value: string) => {
    setSelectedArchitectures((prev) =>
      checked ? [...prev, value] : prev.filter((a) => a !== value),
    );
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setSelectedProviders([]);
    setSelectedArchitectures([]);
  };

  const handleDeploy = (id: string) => {
    const service = mockServices.find((item) => item.id === id);
    if (service) {
      navigate("/ai-deployments", {
        state: {
          deploy: {
            id: service.id,
            title: service.title,
            description: service.description,
          },
        },
      });
    }
  };

  const totalSelectedFilters =
    selectedProviders.length + selectedArchitectures.length;

  // Calculate dynamic counts
  const providerCounts = useMemo(() => {
    return {
      ibm: mockServices.filter((s) => s.provider === "IBM").length,
      ibmCertified: mockServices.filter((s) => s.isCertified).length,
    };
  }, []);

  const architectureCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    mockServices.forEach((service) => {
      service.tags.forEach((tag) => {
        const key = tag.toLowerCase().replace(/\s+/g, "-");
        counts[key] = (counts[key] || 0) + 1;
      });
    });

    return counts;
  }, []);

  // Get unique architectures dynamically
  const uniqueArchitectures = useMemo(() => {
    const architectures = new Set<string>();
    mockServices.forEach((service) => {
      service.tags.forEach((tag) => architectures.add(tag));
    });
    return Array.from(architectures).sort();
  }, []);

  // Filter services based on selected filters
  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearch =
        searchValue === "" ||
        service.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        service.description.toLowerCase().includes(searchValue.toLowerCase());

      const matchesProvider =
        selectedProviders.length === 0 ||
        (selectedProviders.includes("ibm") && service.provider === "IBM") ||
        (selectedProviders.includes("ibm-certified") && service.isCertified);

      const matchesArchitecture =
        selectedArchitectures.length === 0 ||
        service.tags.some((tag) => {
          const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");
          return selectedArchitectures.includes(normalizedTag);
        });

      return matchesSearch && matchesProvider && matchesArchitecture;
    });
  }, [searchValue, selectedProviders, selectedArchitectures]);

  // Filter options based on search
  const providerOptions = useMemo(() => {
    const options = [
      {
        label: "IBM",
        value: "ibm",
        count: providerCounts.ibm,
      },
      {
        label: "IBM certified (any provider)",
        value: "ibm-certified",
        count: providerCounts.ibmCertified,
      },
    ];

    if (!searchValue) return options;

    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, providerCounts]);

  const architectureOptions = useMemo(() => {
    const options = uniqueArchitectures.map((arch) => {
      const key = arch.toLowerCase().replace(/\s+/g, "-");
      return {
        label: arch,
        value: key,
        count: architectureCounts[key] || 0,
      };
    });

    if (!searchValue) return options;

    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, uniqueArchitectures, architectureCounts]);

  const filterAccordions = (
    <>
      {providerOptions.length > 0 && (
        <AccordionItem title="Provider" open>
          {providerOptions.map((option) => (
            <Checkbox
              key={option.value}
              labelText={`${option.label} (${option.count})`}
              id={`provider-${option.value}`}
              checked={selectedProviders.includes(option.value)}
              onChange={(_, { checked }) =>
                handleProviderChange(checked, option.value)
              }
            />
          ))}
        </AccordionItem>
      )}

      {architectureOptions.length > 0 && (
        <AccordionItem title="Architectures" open>
          {architectureOptions.map((option) => (
            <Checkbox
              key={option.value}
              labelText={`${option.label} (${option.count})`}
              id={`architecture-${option.value}`}
              checked={selectedArchitectures.includes(option.value)}
              onChange={(_, { checked }) =>
                handleArchitectureChange(checked, option.value)
              }
            />
          ))}
        </AccordionItem>
      )}
    </>
  );

  const results =
    filteredServices.length > 0 ? (
      <>
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            tags={service.tags}
            isCertified={service.isCertified}
            onDeploy={handleDeploy}
            onLearnMore={(id: string) => console.log("Learn more:", id)}
          />
        ))}
      </>
    ) : null;

  return (
    <CatalogBrowseLayout
      title="Services"
      subtitle="Pre-built AI demos from real-world use cases to help you envision how AI can solve common business problems."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      totalSelectedFilters={totalSelectedFilters}
      onClearFilters={handleClearFilters}
      filterAccordions={filterAccordions}
      results={results}
      emptyMessage="No services found matching your criteria."
    />
  );
};

export default Services;
