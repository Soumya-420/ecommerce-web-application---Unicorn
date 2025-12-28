import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

type DemoRoute = {
  id: number;
  route: string;
  origin: string;
  destination: string;
  capacity: string;
  eta: string;
};

export default function MargdarshakDemo() {
  const [search, setSearch] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<DemoRoute | null>(null);

  const demoRoutes: DemoRoute[] = [
    { id: 1, route: "Route 101", origin: "A", destination: "B", capacity: "Seats Available", eta: "5 mins" },
    { id: 2, route: "Route 202", origin: "C", destination: "D", capacity: "Filling Up", eta: "12 mins" },
    { id: 3, route: "Route 303", origin: "E", destination: "F", capacity: "Crowded", eta: "20 mins" },
  ];

  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mapRef.current) {
      mapRef.current = L.map("map-demo", {
        center: [20.2961, 85.8245],
        zoom: 13,
        minZoom: 4,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const layerGroup = markersLayerRef.current;
    if (!mapRef.current || !layerGroup) return;

    layerGroup.clearLayers();

    demoRoutes.forEach((bus, index) => {
      const icon = L.divIcon({
        html: '<div style="font-size:20px;line-height:1;text-align:center">🚌</div>',
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([20.2961 + index * 0.01, 85.8245 + index * 0.01], { icon });

      const popupHtml = `
        <div style="font-family:inherit; font-size:14px">
          <strong>Route:</strong> ${bus.route}<br/>
          <strong>Status:</strong> ${bus.capacity}<br/>
          <strong>ETA:</strong> ${bus.eta}
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.addTo(layerGroup);
    });
  }, [demoRoutes]);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">🚌 Margdarshak</h1>
        <nav className="flex gap-4 text-gray-600">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Partners</a>
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by route, stop, or destination"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <Button><Search className="h-4 w-4" /></Button>
          </div>

          <Card className="h-[400px] overflow-hidden">
            <div id="map-demo" className="h-[400px] w-full" />
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Live Bus Updates</h2>
              <ul className="space-y-2">
                {demoRoutes.map((bus) => (
                  <li
                    key={bus.id}
                    className={`p-2 rounded-lg cursor-pointer border ${selectedRoute?.id === bus.id ? "bg-blue-100" : "bg-white"}`}
                    onClick={() => setSelectedRoute(bus)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{bus.route}</span>
                      <span className="text-sm text-gray-600">ETA: {bus.eta}</span>
                    </div>
                    <p className="text-xs text-gray-500">{bus.origin} → {bus.destination}</p>
                    <p className={`text-xs mt-1 ${bus.capacity === "Seats Available" ? "text-green-600" : bus.capacity === "Filling Up" ? "text-yellow-600" : "text-red-600"}`}>{bus.capacity}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {selectedRoute && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">Selected Route Details</h2>
                <p><b>Route:</b> {selectedRoute.route}</p>
                <p><b>From:</b> {selectedRoute.origin}</p>
                <p><b>To:</b> {selectedRoute.destination}</p>
                <p><b>Capacity:</b> {selectedRoute.capacity}</p>
                <p><b>ETA:</b> {selectedRoute.eta}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <section className="mt-10">
        <Tabs defaultValue="admin">
          <TabsList>
            <TabsTrigger value="admin">Admin View</TabsTrigger>
            <TabsTrigger value="driver">Driver View</TabsTrigger>
          </TabsList>

          <TabsContent value="admin" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="font-bold text-lg">Admin View</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4"><b>Total Buses:</b> 50</Card>
                  <Card className="p-4"><b>Active Buses:</b> 38</Card>
                  <Card className="p-4"><b>Alerts:</b> 2 Ongoing</Card>
                  <Card className="p-4"><b>Avg Delay:</b> 4 mins</Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="driver" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="font-bold text-lg">Driver View</h2>
                <Button className="w-full">Start Journey</Button>
                <Card className="p-4 bg-gray-50">
                  <p><b>Route:</b> Route 101</p>
                  <p><b>Next Stop:</b> Main Square</p>
                </Card>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">+ Passenger</Button>
                  <Button variant="outline" className="flex-1">- Passenger</Button>
                </div>
                <Button variant="destructive" className="w-full">End Journey</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <footer className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        © 2025 Margdarshak | Partnered with Municipal Authorities
      </footer>
    </div>
  );
}


