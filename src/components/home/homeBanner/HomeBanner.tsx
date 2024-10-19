export default function HomeBanner(): React.ReactElement {
  return (
    <section className="home-banner">
      <div className="home-banner__wrapper">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="home-banner__subtitle">No fees.</p>
        <p className="home-banner__subtitle">No minimum deposit.</p>
        <p className="home-banner__subtitle">High interest rates.</p>
        <p className="home-banner__text">
          Open a savings account with Argent Bank today!
        </p>
      </div>
    </section>
  );
}
