import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppTypes } from "@/type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

enum TAB_VALUE {
  MOUNTAIN = "mountain",
  FISH = "fish",
  CAMP = "camp",
}

interface PointData {
  id: number;
  x: number;
  y: number;
  name: string;
  icon: string;
  activities: string[];
}

const MapComponent = ({ data }: { data: AppTypes.Data[] }) => {
  const [points, setPoints] = useState<PointData[]>([]);
  const [activeTab, setActiveTab] = useState<TAB_VALUE>(TAB_VALUE.MOUNTAIN);
  const mapRef = useRef<HTMLImageElement>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  const iconAdd = {
    mountain: "/icon/moutain-marked.png",
    fish: "/icon/fish-marked.png",
    camp: "/icon/crosshair-marked.png",
  };

  const dataBlock_2 = data?.[0]?.bloc_2 ?? {};

  const buttonGroup = [
    {
      label: dataBlock_2?.cases?.[0] ?? "",
      icon: "/icon/moutains.svg",
      onClick: () => setActiveTab(TAB_VALUE.MOUNTAIN),
      tab: "mountain",
    },
    {
      label: dataBlock_2?.cases?.[1] ?? "",
      icon: "/icon/fishing.svg",
      onClick: () => setActiveTab(TAB_VALUE.FISH),
      tab: "fish",
    },
    {
      label: dataBlock_2?.cases?.[2] ?? "",
      icon: "/icon/crosshair.svg",
      onClick: () => setActiveTab(TAB_VALUE.CAMP),
      tab: "camp",
    },
  ];

  const renderSubTitle = () => {
    return buttonGroup.map((item) => (
      <Button
        variant="outline"
        className={`mt-4 group rounded-full ml-2 border-[#F2542D80]/50 ${
          activeTab === item.tab ? "bg-[#F2542D]/10" : ""
        }`}
        key={item.label}
        onClick={item.onClick}
      >
        <Image src={item.icon} alt={item.label} width={24} height={24} />
        {item.label}
      </Button>
    ));
  };

  const fixedPoints = {
    mountain: [
      {
        id: 1,
        x: 809,
        y: 566,
        name: "Pourvoirie Mountain 1",
        icon: "/icon/moutain-marked.png",
        activities: ["Mountain Climbing Activity"],
      },
      {
        id: 2,
        x: 1232,
        y: 900,
        name: "Pourvoirie Mountain 2",
        icon: "/icon/moutain-marked.png",
        activities: ["Mountain Climbing Activity"],
      },
    ],
    fish: [
      {
        id: 3,
        x: 1500,
        y: 750,
        name: "Pourvoirie Fishing 1",
        icon: "/icon/fish-marked.png",
        activities: ["Fishing Activity"],
      },
      {
        id: 4,
        x: 981,
        y: 500,
        name: "Pourvoirie Fishing 2",
        icon: "/icon/fish-marked.png",
        activities: ["Fishing Activity"],
      },
      {
        id: 5,
        x: 1700,
        y: 350,
        name: "Pourvoirie Fishing 3",
        icon: "/icon/fish-marked.png",
        activities: ["Fishing Activity"],
      },
    ],
    camp: [
      {
        id: 6,
        x: 1800,
        y: 600,
        name: "Pourvoirie Camping 1",
        icon: "/icon/crosshair-marked.png",
        activities: ["Camping Activity"],
      },
      {
        id: 7,
        x: 1400,
        y: 456,
        name: "Pourvoirie Camping 2",
        icon: "/icon/crosshair-marked.png",
        activities: ["Camping Activity"],
      },
    ],
  };

  useEffect(() => {
    setPoints([]);
  }, [activeTab]);

  const getVisiblePoints = () => {
    return [...fixedPoints[activeTab], ...points];
  };

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect || !mapRef.current) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const scaleX =
      mapSize.width / (mapRef.current?.offsetWidth || mapSize.width);
    const scaleY =
      mapSize.height / (mapRef.current?.offsetHeight || mapSize.height);

    const newPoint = {
      id: Date.now(),
      x: x * scaleX,
      y: y * scaleY,
      name: `New Pourvoirie ${points.length + 1}`,
      activities: ["Custom Activity"],
      icon: iconAdd[activeTab as keyof typeof iconAdd],
    };
    setPoints([...points, newPoint]);
    toast.success("New point marked!");
  };

  const handleMarkerClick = (point: PointData) => {
    toast.info(`You selected: ${point.name}`);
  };

  const resetMap = () => {
    setPoints([]);
    toast.info("Map has been reset.");
  };

  const markerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
    hover: { scale: 1.1 },
  };

  useLayoutEffect(() => {
    if (mapRef.current) {
      const updateSize = () => {
        if (mapRef.current) {
          // Add null check here
          setMapSize({
            width: mapRef.current.naturalWidth,
            height: mapRef.current.naturalHeight,
          });
        }
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // Tính toán vị trí marker dựa trên kích thước hiện tại của bản đồ
  const calculateMarkerPosition = (pointX: number, pointY: number) => {
    if (!mapRef.current) return { left: 0, top: 0 };

    const currentWidth = mapRef.current.offsetWidth;
    const currentHeight = mapRef.current.offsetHeight;

    // Tính tỷ lệ giữa kích thước gốc và kích thước hiện tại
    const scaleX = currentWidth / mapSize.width;
    const scaleY = currentHeight / mapSize.height;

    // Tính toán vị trí hiện tại dựa trên tỷ lệ
    const scaledX = pointX * scaleX;
    const scaledY = pointY * scaleY;

    // Giới hạn vị trí để không tràn ra ngoài khung
    const maxX = currentWidth - 10; // 10 là bán kính của marker
    const maxY = currentHeight - 10;

    return {
      left: Math.max(0, Math.min(scaledX, maxX)),
      top: Math.max(0, Math.min(scaledY, maxY)),
    };
  };

  return (
    <div className="mt-5">
      <div className="flex justify-center mb-10 flex-wrap">
        {renderSubTitle()}
      </div>

      <div>
        <div className="relative mb-4">
          <img
            ref={mapRef}
            src="/map.png"
            alt="map image"
            onClick={handleClick}
            className="w-full rounded-lg shadow-md cursor-crosshair"
          />
          {getVisiblePoints().map((point) => {
            const { left, top } = calculateMarkerPosition(point.x, point.y);
            return (
              <motion.div
                key={point.id}
                data-tooltip-id={`tooltip-${point.id}`}
                className="absolute text-lg"
                style={{
                  left: left - 10, // Điều chỉnh vị trí marker
                  top: top - 10,
                  transform: "translate(-50%, -50%)",
                }}
                variants={markerVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                whileHover="hover"
                onClick={() => handleMarkerClick(point)}
              >
                <Image
                  src={point.icon}
                  alt={point.name}
                  width={62}
                  height={62}
                />
                <ReactTooltip
                  id={`tooltip-${point.id}`}
                  place="top"
                  render={() => (
                    <div className="max-w-[200px] p-2 rounded-xl shadow-md text-sm">
                      <p>Name: {point.name}</p>
                      <p>
                        Position: x={point.x}, y={point.y}
                      </p>
                      <p>Activities: {point.activities.join(", ")}</p>
                      <p>Rental Suggestions: House A, House B, House C</p>
                    </div>
                  )}
                  style={{ zIndex: 100000000 }}
                />
              </motion.div>
            );
          })}
          <div
            className="absolute top-5 left-5 bg-gray-100 text-black p-2 rounded-lg flex items-center gap-2 text-sm md:text-base"
            style={{
              boxShadow: "0px 2px 10px 0px rgba(51, 51, 51, 0.10)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <Image src="/icon/sample.png" alt="map" width={40} height={40} />
            Emplacement
          </div>
          <Button
            onClick={resetMap}
            variant="outline"
            className="px-4 py-2 rounded transition absolute bottom-0 left-0 mb-4 ml-4"
          >
            Reset
          </Button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MapComponent;
