interface IBadge {
  label: string;
}

/**
 * @description Badge to indicate whether it's premium article or not
 *
 * nit: I decided to use inline styles object
 *
 * @returns React Component
 */
export const Badge: React.FC<IBadge> = ({ label }) => (
  <label
    style={{
      border: '1px solid gold',
      borderRadius: 5,
      padding: 3,
      fontSize: '0.5rem',
      backgroundColor: 'gold',
      color: 'white',
    }}
  >
    {label}
  </label>
);
