export const Logo = () => (
  <div style={{ width: '48px', height: '48px' }} className="d-flex align-items-center justify-content-center">
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20 L40 45 V100 C40 145 100 180 100 180 V20 Z" fill="#87B356" />
      <path d="M100 20 L160 45 V100 C160 145 100 180 100 180 V20 Z" fill="#6B9143" />
      <circle cx="100" cy="95" r="45" fill="white" fillOpacity="0.2" />
      <g fill="#E3EBF4">
        <circle cx="100" cy="85" r="15" />
        <path d="M100 105 c-18 0-32 10-32 24 v6 h64 v-6 c0-14-14-24-32-24 z" />
      </g>
    </svg>
  </div>
);