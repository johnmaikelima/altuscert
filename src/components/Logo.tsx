export default function Logo() {
  return (
    <svg
      viewBox="0 0 200 80"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cadeado */}
      <g transform="translate(10, 15)">
        {/* Corpo do cadeado */}
        <rect x="8" y="20" width="24" height="28" rx="2" fill="white" stroke="white" strokeWidth="1.5" />
        
        {/* Arco do cadeado */}
        <path
          d="M 12 20 Q 12 5 20 5 Q 28 5 28 20"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Buraco da chave */}
        <circle cx="20" cy="32" r="2.5" fill="#003d99" />
      </g>

      {/* Texto ALTUS */}
      <text
        x="50"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="48"
        fontWeight="900"
        fill="white"
        letterSpacing="2"
      >
        ALTUS
      </text>
    </svg>
  );
}
