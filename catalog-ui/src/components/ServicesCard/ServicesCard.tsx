import { Button, Tag, Tooltip } from "@carbon/react";
import { ArrowRight, Badge, Deploy } from "@carbon/icons-react";
import styles from "./ServicesCard.module.scss";

export interface ServicesCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  isCertified?: boolean;
  onDeploy?: (id: string) => void;
  onLearnMore?: (id: string) => void;
  onExplore?: (id: string) => void;
}

const ServicesCard = ({
  id,
  title,
  description,
  tags,
  category,
  isCertified,
  onDeploy,
  onLearnMore,
  onExplore,
}: ServicesCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.titleBadge}>
          <span className={styles.titleText}>{title}</span>
        </div>
        {isCertified && (
          <Tooltip align="top" label="IBM certified">
            <button className={styles.certifiedBadge} type="button">
              <Badge size={20} className={styles.badgeIcon} />
            </button>
          </Tooltip>
        )}
      </div>

      <p className={styles.cardDescription}>{description}</p>

      <div className={styles.tagsSection}>
        <h4 className={styles.tagsHeading}>Architectures</h4>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <Tag key={index} type="gray" size="md" className={styles.tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className={styles.cardActions}>
        {onDeploy && (
          <Button
            kind="tertiary"
            size="md"
            renderIcon={Deploy}
            onClick={() => onDeploy(id)}
            className={styles.deployButton}
          >
            Deploy
          </Button>
        )}
        {onExplore && (
          <Button
            kind="tertiary"
            size="md"
            renderIcon={Deploy}
            onClick={() => onExplore(id)}
            className={styles.deployButton}
          >
            Explore
          </Button>
        )}
        {onLearnMore && (
          <Button
            kind="tertiary"
            size="md"
            renderIcon={ArrowRight}
            onClick={() => onLearnMore(id)}
            className={styles.learnMoreButton}
          >
            Learn more
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServicesCard;
