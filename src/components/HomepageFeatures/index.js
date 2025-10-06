import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    ImgSrc: require('@site/static/img/smartsystemshub-easy-to-use.jpg').default,
    description: (
      <>
        <p>
          Our goal is to reduce complexity. With the experimental field, companies do not have to deal with data exchange formats, authentication,
          and authorization processes; we provide these components ready-to-use. Each participant can use identities and wallets, and connectors are
          also provided that are used exclusively for their own use case.
        </p>
      </>
    ),
  },
  {
    title: 'Tech Facts',
    ImgSrc: require('@site/static/img/smartsystemshub-lp-manufacturingx-stageheader_v1.jpg').default,
    description: (
      <>
        <ul style={{textAlign: 'left', display: 'inline-block'}}>
          <li>Open source components (Tractus-X EDC, Digital Twin Registry)</li>
          <li>Identity & authentication management via Smart Systems Hub</li>
          <li>Exchange of information regardless of the type and content of the data</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Use Cases',
    ImgSrc: require('@site/static/img/smartsystemshub-lp-manufacturingx-graphic-usecases_v1.jpg').default,
    description: (
      <>
        <ul style={{textAlign: 'left', display: 'inline-block'}}>
          <li>Traceability</li>
          <li>Carbon Footprint Management</li>
          <li>Circular Economy</li>
          <li>Condition Monitoring led Services</li>
          <li>Manufacturing as a Service — On‑demand Manufacturing</li>
        </ul>
      </>
    ),
  },
];

function Feature({Svg, ImgSrc, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? (
          <Svg className={styles.featureSvg} role="img" />
        ) : ImgSrc ? (
          <img src={ImgSrc} alt={title} className={styles.featureSvg} />
        ) : null}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        {description}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
