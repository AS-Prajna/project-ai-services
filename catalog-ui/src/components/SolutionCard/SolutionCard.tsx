import { Button, Tag } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import Agriculture from "@carbon/pictograms-react/lib/agriculture";
import Banking from "@carbon/pictograms-react/lib/banking";
import AppDeveloper from "@carbon/pictograms-react/lib/app--developer";
import PlanningAnalytics from "@carbon/pictograms-react/lib/planning--analytics";
import MedicalStaff from "@carbon/pictograms-react/lib/medical--staff";
import Insurance from "@carbon/pictograms-react/lib/insurance";
import ItInfrastructure from "@carbon/pictograms-react/lib/it--infrastructure";
import CloudBuilderProfessionalServices from "@carbon/pictograms-react/lib/cloud--builder--professional--services";
import Public from "@carbon/pictograms-react/lib/public";
import RealEstate from "@carbon/pictograms-react/lib/real-estate";
import styles from "./SolutionCard.module.scss";

interface SolutionCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  onExplore: (id: string) => void;
}

const categoryPictograms: Record<
  string,
  React.ComponentType<{ size?: string | number }>
> = {
  Agriculture: Agriculture,
  "Banking and Finance": Banking,
  "Dev operations": AppDeveloper,
  "Enterprise resource planning": PlanningAnalytics,
  Healthcare: MedicalStaff,
  Insurance: Insurance,
  "IT operations": ItInfrastructure,
  "Professional services": CloudBuilderProfessionalServices,
  "Public sector": Public,
  "Real estates": RealEstate,
};

const SolutionCard = ({
  id,
  title,
  description,
  tags,
  category,
  onExplore,
}: SolutionCardProps) => {
  const PictogramComponent = categoryPictograms[category] || Agriculture;
  const maxVisibleTags = 4;
  const visibleTags = tags.slice(0, maxVisibleTags);
  const remainingCount = tags.length - maxVisibleTags;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.pictogram}>
          <PictogramComponent size={36} />
        </div>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.category}>{category}</p>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tagsSection}>
        <h4 className={styles.tagsHeading}>Reference architectures</h4>
        <div className={styles.tags}>
          {visibleTags.map((tag, index) => (
            <Tag key={index} type="gray" size="sm">
              {tag}
            </Tag>
          ))}
          {remainingCount > 0 && (
            <Tag type="gray" size="sm">
              +{remainingCount}
            </Tag>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          kind="tertiary"
          size="sm"
          renderIcon={ArrowRight}
          onClick={() => onExplore(id)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default SolutionCard;
