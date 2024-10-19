import { formatAltForIcon } from "../../../utils/utils";

type FeatureItemProps = { icon: string; title: string; content: string };

export default function FeatureItem({
  icon,
  title,
  content,
}: FeatureItemProps): React.ReactElement {
  return (
    <div className="feature-item">
      <img
        src={require(`../../../assets/icons/${icon}.png`) || ""}
        alt={formatAltForIcon(icon)}
        className="feature-item__icon"
      />
      <h3 className="feature-item__title">{title}</h3>
      <p className="feature-item__content">{content}</p>
    </div>
  );
}
