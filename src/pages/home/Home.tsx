import { memo, MemoExoticComponent } from "react";

import HomeBanner from "../../components/home/homeBanner/HomeBanner";
import FeatureItem from "../../components/home/featureItem/FeatureItem";

export default function Home(): React.ReactElement {
  const FeaturesRow: MemoExoticComponent<
    () => React.ReactElement<any, any> | null
  > = memo(() => (
    <>
      {FEATURES.map((item) => (
        <FeatureItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          content={item.content}
        />
      ))}
    </>
  ));

  return (
    <main className="home">
      <HomeBanner />
      <section className="home__features">
        <h2 className="sr-only">Features</h2>
        <FeaturesRow />
      </section>
    </main>
  );
}

const FEATURES = [
  {
    icon: "icon-chat",
    title: "You are our #1 priority",
    content:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    icon: "icon-money",
    title: "More savings means higher rates",
    content:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    icon: "icon-security",
    title: "Security you can trust",
    content:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];
