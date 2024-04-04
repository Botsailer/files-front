import React, { useState, useEffect } from "react";

const DOPieChart = ({ totalStorage, usedStorage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usedPercentage, setUsedPercentage] = useState(0);
  const [availablePercentage, setAvailablePercentage] = useState(100);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setUsedPercentage((usedStorage / totalStorage) * 100);
      setAvailablePercentage(100 - (usedStorage / totalStorage) * 100);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [totalStorage, usedStorage]);

  const handleHover = (slice) => {
    setHoveredSlice(slice);
  };

  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };

  return (
    <div className="flex justify-center items-center h-full">
      {isLoading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      ) : (
        <div className="relative">
          <div
            className="w-64 h-64 rounded-full"
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-500 ${
                hoveredSlice === "used" ? "opacity-100 z-10" : "opacity-75"
              }`}
              style={{
                background: `conic-gradient(from 0deg, #ef4444 0% ${usedPercentage}%, transparent ${usedPercentage}% ${availablePercentage}%)`,
              }}
              onMouseEnter={() => handleHover("used")}
            >
              {hoveredSlice === "used" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-md shadow-lg">
                  <p className="text-gray-800 font-semibold">
                    Used Storage: {usedStorage} GB ({usedPercentage.toFixed(2)}%)
                  </p>
                </div>
              )}
            </div>
            <div
              className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-500 ${
                hoveredSlice === "available" ? "opacity-100 z-10" : "opacity-75"
              }`}
              style={{
                background: `conic-gradient(from 0deg, transparent 0% ${usedPercentage}%, #22c55e ${usedPercentage}% 100%)`,
              }}
              onMouseEnter={() => handleHover("available")}
            >
              {hoveredSlice === "available" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-md shadow-lg">
                  <p className="text-gray-800 font-semibold">
                    Available: {totalStorage - usedStorage} GB ({availablePercentage.toFixed(2)}%)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DOPieChart;
