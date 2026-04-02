import SubPageLayout from "@/components/SubPageLayout";
import { MapPin, Clock, Phone, Navigation, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type Pharmacy = {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  openNow: boolean;
  hours: string;
  phone: string;
  hasProduct: boolean;
  lat: number;
  lng: number;
};

const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "ร้านยาฟาสซิโน สาขาสยามสแควร์",
    address: "254 ถ.พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ",
    distance: "0.8 กม.",
    rating: 4.8,
    openNow: true,
    hours: "09:00 - 21:00",
    phone: "02-123-4567",
    hasProduct: true,
    lat: 13.7457,
    lng: 100.5331,
  },
  {
    id: 2,
    name: "ร้านยาเซฟดรัก สาขาอโศก",
    address: "88 ถ.อโศกมนตรี แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ",
    distance: "1.2 กม.",
    rating: 4.5,
    openNow: true,
    hours: "08:00 - 22:00",
    phone: "02-234-5678",
    hasProduct: true,
    lat: 13.7380,
    lng: 100.5601,
  },
  {
    id: 3,
    name: "ร้านยาบูทส์ สาขาเซ็นทรัลลาดพร้าว",
    address: "1693 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ",
    distance: "2.5 กม.",
    rating: 4.6,
    openNow: false,
    hours: "10:00 - 21:00",
    phone: "02-345-6789",
    hasProduct: true,
    lat: 13.8163,
    lng: 100.5618,
  },
  {
    id: 4,
    name: "ร้านยาหมอยา สาขาบางนา",
    address: "39 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ",
    distance: "4.1 กม.",
    rating: 4.3,
    openNow: true,
    hours: "08:30 - 20:00",
    phone: "02-456-7890",
    hasProduct: true,
    lat: 13.6682,
    lng: 100.6048,
  },
  {
    id: 5,
    name: "ร้านยาวัฒนเภสัช สาขาทองหล่อ",
    address: "55 ซ.สุขุมวิท 55 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ",
    distance: "5.3 กม.",
    rating: 4.7,
    openNow: true,
    hours: "09:00 - 20:30",
    phone: "02-567-8901",
    hasProduct: true,
    lat: 13.7310,
    lng: 100.5780,
  },
];

const NearbyPharmacyPage = () => {
  const [showMap, setShowMap] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!showMap || !mapRef.current || mapInstanceRef.current) return;

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const map = L.map(mapRef.current).setView([13.7457, 100.55], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      pharmacies.forEach((p) => {
        L.marker([p.lat, p.lng])
          .addTo(map)
          .bindPopup(`<strong>${p.name}</strong><br/><span style="font-size:12px">${p.openNow ? "✅ เปิดอยู่" : "❌ ปิดแล้ว"}</span>`);
      });

      mapInstanceRef.current = map;
    };

    if ((window as any).L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showMap]);

  return (
    <SubPageLayout title="ร้านขายยาใกล้เคียง">
      {/* Map */}
      {showMap && (
        <div className="rounded-xl overflow-hidden mb-4 border border-border" style={{ height: 260 }}>
          <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </div>
      )}

      {/* Toggle map button */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-primary mb-4 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
      >
        <MapPin size={14} />
        {showMap ? "ซ่อนแผนที่" : "แสดงแผนที่"}
      </button>
      {/* Header info */}
      <div className="bg-primary/10 rounded-xl p-4 mb-5 flex items-start gap-3">
        <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            ร้านขายยาที่มีผลิตภัณฑ์ Kinabetes
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            แสดงร้านขายยาใกล้ตำแหน่งของคุณที่มี Kinabetes Testing Sticker จำหน่าย
          </p>
        </div>
      </div>

      {/* Pharmacy list */}
      <div className="space-y-3">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-card border border-border rounded-xl p-4"
          >
            {/* Name & rating */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground flex-1 pr-2">
                {pharmacy.name}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-xs font-medium text-foreground">
                  {pharmacy.rating}
                </span>
              </div>
            </div>

            {/* Address */}
            <p className="text-xs text-muted-foreground mb-3">
              {pharmacy.address}
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                <Navigation size={12} className="text-primary" />
                {pharmacy.distance}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  pharmacy.openNow
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <Clock size={12} />
                {pharmacy.openNow ? "เปิดอยู่" : "ปิดแล้ว"} · {pharmacy.hours}
              </span>
            </div>

            {/* Product badge */}
            {pharmacy.hasProduct && (
              <div className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-3">
                ✓ มี Kinabetes Testing Sticker
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <a
                href={`tel:${pharmacy.phone}`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-muted hover:bg-muted/80 transition-colors text-foreground text-xs font-medium py-2.5 rounded-lg"
              >
                <Phone size={14} />
                โทร
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacy.name + " " + pharmacy.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 transition-colors text-primary-foreground text-xs font-medium py-2.5 rounded-lg"
              >
                <Navigation size={14} />
                นำทาง
              </a>
            </div>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
};

export default NearbyPharmacyPage;
