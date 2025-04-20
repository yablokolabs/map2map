import { FaMapMarkerAlt, FaSyncAlt, FaEdit, FaImage } from 'react-icons/fa';

const features = [
  {
    icon: <FaMapMarkerAlt size={32} />,
    title: 'New Listing Creation',
  },
  {
    icon: <FaSyncAlt size={32} />,
    title: 'Listing Updates & Optimization',
  },
  {
    icon: <FaEdit size={32} />,
    title: 'Accurate Business Info Corrections',
  },
  {
    icon: <FaImage size={32} />,
    title: 'Visual Enhancements',
  },
];

const FeatureGrid = () => {
  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-grid__item"
          data-aos="zoom-in"
          data-aos-delay={index * 100}
          data-aos-duration="800"
        >
          <div className="feature-grid__icon">{feature.icon}</div>
          <h3 className="feature-grid__title">{feature.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
