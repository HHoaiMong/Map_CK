// ==========================================
// FILE: app/explore.tsx - PHẦN 1
// Copy PHẦN 1 và PHẦN 2 vào cùng 1 file explore.tsx
// ==========================================

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "./contexts/userContext";
import MainTab from "./navigation/MainTab";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ==================== INTERFACES ====================
interface ExploreCategory {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  emoji: string;
  title: string;
  description: string;
  color: string;
}

interface ServiceProvider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  phone: string;
  status: string;
  image: string;
  address?: string;
  openHours?: string;
  services?: string[];
  description?: string;
  amenities?: string[];
  priceRange?: string;
}

interface Place {
  id: number;
  name: string;
  rating: number;
  reviews: number | string;
  distance: string;
  status: string;
  image: string;
  category: string;
  address?: string;
  openHours?: string;
  services?: string[];
  description?: string;
  amenities?: string[];
  priceRange?: string;
  phone?: string;
}

// ==================== MAIN COMPONENT ====================
export default function Explore() {
  const { user } = useUser();
  const router = useRouter();

  // States
  const [searchText, setSearchText] = useState("");
  const [currentScreen, setCurrentScreen] = useState<
    | "main"
    | "rescue"
    | "repair"
    | "charging"
    | "atm"
    | "allPlaces"
    | "placeDetail"
  >("main");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<
    Place | ServiceProvider | null
  >(null);

  // ==================== STATIC DATA ====================
  const categories: ExploreCategory[] = [
    {
      id: "hot",
      icon: "fire",
      emoji: "🔥",
      title: "Địa điểm đang hot",
      description: "Những nơi được nhiều người check-in nhất",
      color: "#ff6b35",
    },
    {
      id: "rating",
      icon: "star",
      emoji: "⭐",
      title: "Đánh giá cao",
      description: "Top địa điểm được yêu thích nhất",
      color: "#ffd93d",
    },
    {
      id: "crowded",
      icon: "account-group",
      emoji: "🧑‍🤝‍🧑",
      title: "Đông người ghé",
      description: "Nơi tập trung đông người hiện tại",
      color: "#6bcf7f",
    },
    {
      id: "deals",
      icon: "tag",
      emoji: "💸",
      title: "Giá rẻ – ưu đãi",
      description: "Khuyến mãi và ưu đãi đặc biệt",
      color: "#ff3864",
    },
    {
      id: "suggest",
      icon: "compass",
      emoji: "🎯",
      title: "Gợi ý cho bạn",
      description: "Dựa trên sở thích của bạn",
      color: "#00d4ff",
    },
    {
      id: "events",
      icon: "party-popper",
      emoji: "🎪",
      title: "Sự kiện gần bạn",
      description: "Những sự kiện đang diễn ra",
      color: "#c77dff",
    },
  ];

  const filterOptions = [
    {
      id: "food",
      icon: "silverware-fork-knife",
      label: "Ăn uống",
      color: "#ff6b35",
      category: "services",
    },
    {
      id: "coffee",
      icon: "coffee",
      label: "Cà phê",
      color: "#8b4513",
      category: "services",
    },
    {
      id: "hotel",
      icon: "bed",
      label: "Khách sạn",
      color: "#9b59b6",
      category: "services",
    },
    {
      id: "shopping",
      icon: "shopping",
      label: "Mua sắm",
      color: "#e74c3c",
      category: "services",
    },
    {
      id: "gas",
      icon: "gas-station",
      label: "Trạm xăng",
      color: "#ffd93d",
      category: "vehicle",
    },
    {
      id: "parking",
      icon: "parking",
      label: "Bãi đỗ xe",
      color: "#6bcf7f",
      category: "vehicle",
    },
    {
      id: "charging",
      icon: "ev-station",
      label: "Trạm sạc",
      color: "#00d4ff",
      category: "vehicle",
    },
    {
      id: "repair",
      icon: "wrench",
      label: "Sửa xe",
      color: "#c77dff",
      category: "vehicle",
    },
    {
      id: "rescue",
      icon: "car-side",
      label: "Cứu hộ",
      color: "#ff3864",
      category: "vehicle",
    },
    {
      id: "atm",
      icon: "cash-multiple",
      label: "ATM",
      color: "#27ae60",
      category: "utilities",
    },
    {
      id: "hospital",
      icon: "hospital-box",
      label: "Bệnh viện",
      color: "#e74c3c",
      category: "utilities",
    },
    {
      id: "pharmacy",
      icon: "pill",
      label: "Nhà thuốc",
      color: "#3498db",
      category: "utilities",
    },
    {
      id: "police",
      icon: "police-badge",
      label: "Công an",
      color: "#34495e",
      category: "utilities",
    },
    {
      id: "toilet",
      icon: "toilet",
      label: "Nhà vệ sinh",
      color: "#95a5a6",
      category: "utilities",
    },
  ];

  // ==========================================
  // CẬP NHẬT ẢNH CHO CÁC ĐỊA ĐIỂM
  // Copy phần data này thay thế vào PART 1
  // ==========================================

  const rescueProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "Cứu hộ giao thông Số 1 - Hà Nội",
      rating: 4.8,
      reviews: 245,
      distance: "0.5 km",
      phone: "1900 1212",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop", // Xe cứu hộ chuyên nghiệp
      address: "123 Đường Láng, Đống Đa, Hà Nội",
      openHours: "24/7 - Hoạt động cả tuần",
      description:
        "Dịch vụ cứu hộ giao thông chuyên nghiệp, nhanh chóng với đội ngũ kỹ thuật viên giàu kinh nghiệm. Chúng tôi cam kết có mặt trong vòng 15-30 phút tại mọi địa điểm trong nội thành.",
      services: [
        "Cứu hộ xe máy, ô tô",
        "Thay lốp xe tại chỗ",
        "Sạc bình ắc quy",
        "Kéo xe về garage",
        "Mở khóa xe",
        "Cấp cứu sự cố kỹ thuật",
      ],
      amenities: ["Thanh toán thẻ", "Bảo hiểm", "Theo dõi GPS"],
      priceRange: "200.000đ - 800.000đ",
    },
    {
      id: 2,
      name: "Dịch vụ cứu hộ 24/7",
      rating: 4.6,
      reviews: 189,
      distance: "1.2 km",
      phone: "0987654321",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop", // Xe tải cứu hộ
      address: "45 Nguyễn Trãi, Thanh Xuân, Hà Nội",
      openHours: "24/7 - Hoạt động cả tuần",
      description:
        "Dịch vụ cứu hộ uy tín với mạng lưới rộng khắp Hà Nội. Đội ngũ nhân viên nhiệt tình, chu đáo.",
      services: [
        "Cứu hộ khẩn cấp 24/7",
        "Vận chuyển xe hỏng",
        "Hỗ trợ kỹ thuật tại chỗ",
        "Thay thế phụ tùng",
      ],
      amenities: ["Xe cứu hộ hiện đại", "Bảo hiểm", "Hỗ trợ trực tuyến"],
      priceRange: "150.000đ - 700.000đ",
    },
    {
      id: 3,
      name: "Cứu hộ xe gấp",
      rating: 4.5,
      reviews: 156,
      distance: "1.8 km",
      phone: "0912345678",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop", // Thợ sửa xe
      address: "78 Giải Phóng, Hoàng Mai, Hà Nội",
      openHours: "06:00 - 23:00",
      description:
        "Cứu hộ nhanh chóng, giá cả phải chăng. Phục vụ nhiệt tình trong giờ cao điểm.",
      services: ["Cứu hộ xe máy", "Cứu hộ ô tô 4-7 chỗ", "Thay lốp", "Nổ máy"],
      amenities: ["Giá cố định", "Không phụ thu"],
      priceRange: "100.000đ - 500.000đ",
    },
  ];

  const repairProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "Xưởng sửa xe Minh Anh",
      rating: 4.7,
      reviews: 312,
      distance: "0.8 km",
      phone: "028 38234567",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1632823469883-d8f8b6b5d9a5?w=800&h=600&fit=crop", // Garage chuyên nghiệp
      address: "234 Lê Văn Sỹ, Quận 3, TP.HCM",
      openHours: "08:00 - 20:00 hàng ngày",
      description:
        "Garage chuyên nghiệp với đội ngũ thợ có tay nghề cao, kinh nghiệm 15 năm trong nghề. Chuyên sửa chữa và bảo dưỡng mọi loại xe.",
      services: [
        "Bảo dưỡng định kỳ",
        "Sửa chữa động cơ",
        "Thay dầu máy",
        "Kiểm tra hệ thống phanh",
        "Sửa chữa điện - điện tử",
        "Thay thế phụ tùng chính hãng",
      ],
      amenities: [
        "Phòng chờ điều hòa",
        "WiFi miễn phí",
        "Bảo hành 6 tháng",
        "Rửa xe miễn phí",
      ],
      priceRange: "300.000đ - 3.000.000đ",
    },
    {
      id: 2,
      name: "Garage Oto Sài Gòn",
      rating: 4.6,
      reviews: 287,
      distance: "1.3 km",
      phone: "028 39876543",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&fit=crop", // Xưởng sửa xe hiện đại
      address: "567 Võ Văn Tần, Quận 3, TP.HCM",
      openHours: "07:30 - 19:00 (T2-CN)",
      description:
        "Xưởng sửa xe ô tô chuyên sâu, trang bị máy móc hiện đại. Chuyên các dòng xe Nhật, Hàn, Mỹ.",
      services: [
        "Chẩn đoán bằng máy tính",
        "Sửa hệ thống điều hòa",
        "Đại tu động cơ",
        "Sơn phục hồi",
        "Độ xe theo yêu cầu",
      ],
      amenities: ["Cam hành trình", "Bảo hiểm", "Xe đưa đón"],
      priceRange: "500.000đ - 5.000.000đ",
    },
    {
      id: 3,
      name: "Sửa xe 24/7 Trần Hưng Đạo",
      rating: 4.4,
      reviews: 198,
      distance: "2.1 km",
      phone: "028 37654321",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop", // Thợ đang sửa xe
      address: "890 Trần Hưng Đạo, Quận 5, TP.HCM",
      openHours: "24/7 - Hoạt động liên tục",
      description:
        "Garage hoạt động 24/7, hỗ trợ khẩn cấp mọi lúc. Phù hợp cho các trường hợp cần sửa chữa gấp.",
      services: [
        "Sửa chữa khẩn cấp",
        "Thay lốp đột xuất",
        "Sửa phanh",
        "Kiểm tra miễn phí",
      ],
      amenities: ["Phục vụ xuyên đêm", "Giá hợp lý"],
      priceRange: "200.000đ - 2.000.000đ",
    },
  ];

  const chargingProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "Trạm sạc EVgo - Tây Hồ",
      rating: 4.6,
      reviews: 89,
      distance: "1.1 km",
      phone: "1900 1900",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop", // Trạm sạc xe điện hiện đại
      address: "12 Đường Âu Cơ, Tây Hồ, Hà Nội",
      openHours: "24/7",
      description:
        "Trạm sạc nhanh DC với công suất 150kW, hỗ trợ đa dạng các loại xe điện. Khu vực sạch sẽ, an toàn.",
      services: [
        "Sạc nhanh DC (150kW)",
        "Sạc AC (22kW)",
        "Ứng dụng theo dõi",
        "Thanh toán không tiếp xúc",
        "Hỗ trợ kỹ thuật 24/7",
      ],
      amenities: [
        "WiFi miễn phí",
        "Khu vực chờ có mái che",
        "Camera an ninh",
        "Thanh toán đa dạng",
      ],
      priceRange: "3.000đ - 5.000đ/kWh",
    },
    {
      id: 2,
      name: "Charging Station Aeon",
      rating: 4.5,
      reviews: 76,
      distance: "2.3 km",
      phone: "028 27284568",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", // Trạm sạc Tesla
      address: "AEON Mall Tân Phú, TP.HCM",
      openHours: "09:00 - 22:00",
      description:
        "Trạm sạc nằm trong khu vực AEON Mall, tiện lợi để mua sắm trong khi chờ sạc xe.",
      services: [
        "Sạc nhanh 50kW",
        "Đỗ xe miễn phí",
        "Ứng dụng đặt trước",
        "Dịch vụ vệ sinh xe",
      ],
      amenities: ["Trung tâm thương mại", "Nhà hàng", "Siêu thị"],
      priceRange: "4.000đ - 6.000đ/kWh",
    },
    {
      id: 3,
      name: "Trạm sạc nhanh Vinfast",
      rating: 4.7,
      reviews: 134,
      distance: "2.8 km",
      phone: "1900 1234",
      status: "HOẠT ĐỘNG",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", // Xe điện đang sạc
      address: "456 Lê Duẩn, Quận 1, TP.HCM",
      openHours: "24/7",
      description:
        "Trạm sạc chuẩn Vinfast với công nghệ sạc nhanh nhất hiện nay. Ưu tiên xe Vinfast nhưng hỗ trợ các dòng xe khác.",
      services: [
        "Sạc siêu nhanh 250kW",
        "Đặt chỗ trực tuyến",
        "Bảo trì định kỳ",
        "Hỗ trợ 24/7",
      ],
      amenities: ["Showroom Vinfast", "Quán cafe", "Khu vui chơi trẻ em"],
      priceRange: "2.500đ - 4.500đ/kWh",
    },
  ];

  const atmProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "ATM Vietcombank - Nguyễn Huệ",
      rating: 4.8,
      reviews: 567,
      distance: "0.3 km",
      phone: "028 38222222",
      status: "24/7",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", // ATM hiện đại
      address: "1 Nguyễn Huệ, Quận 1, TP.HCM",
      openHours: "24/7",
      description:
        "Cây ATM hiện đại của Vietcombank tại trung tâm thành phố. Luôn có tiền mặt, bảo mật cao.",
      services: [
        "Rút tiền mặt",
        "Chuyển khoản nhanh",
        "Nạp tiền điện thoại",
        "Thanh toán hóa đơn",
        "Kiểm tra số dư",
        "Đổi mã PIN",
      ],
      amenities: ["Camera an ninh", "Bảo vệ 24/7", "Có mái che", "Điều hòa"],
      priceRange: "Miễn phí (nội mạng)",
    },
    {
      id: 2,
      name: "ATM Techcombank - Pasteur",
      rating: 4.7,
      reviews: 456,
      distance: "0.6 km",
      phone: "028 27204567",
      status: "24/7",
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop", // ATM ngoài trời
      address: "139 Pasteur, Quận 1, TP.HCM",
      openHours: "24/7",
      description:
        "ATM Techcombank với giao diện thân thiện, giao dịch nhanh chóng và bảo mật.",
      services: ["Rút tiền", "Chuyển khoản", "Nạp tiền điện thoại", "QR Code"],
      amenities: ["Bảo vệ", "Sạch sẽ", "An toàn"],
      priceRange: "1.100đ - 3.300đ (liên ngân hàng)",
    },
    {
      id: 3,
      name: "ATM BIDV - Hàng Bộ",
      rating: 4.6,
      reviews: 389,
      distance: "0.9 km",
      phone: "028 38222111",
      status: "24/7",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1bf4e55?w=800&h=600&fit=crop", // ATM trong ngân hàng
      address: "35 Hàng Bộ, Ba Đình, Hà Nội",
      openHours: "24/7",
      description: "ATM BIDV hoạt động ổn định, phục vụ tốt khách hàng.",
      services: ["Rút tiền", "Chuyển khoản", "Nạp tiền"],
      amenities: ["An ninh", "Sẵn tiền"],
      priceRange: "1.650đ - 3.300đ (liên ngân hàng)",
    },
  ];

  const allPlaces: Place[] = [
    {
      id: 1,
      name: "The Coffee House",
      rating: 4.5,
      reviews: "2.6k",
      distance: "0.8 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop", // Quán cà phê hiện đại
      category: "coffee",
      address: "86-88 Cao Thắng, Quận 3, TP.HCM",
      openHours: "07:00 - 23:00",
      phone: "028 39303084",
      description:
        "Chuỗi cà phê nổi tiếng với không gian thoải mái, đồ uống đa dạng và giá cả phải chăng. Điểm đến lý tưởng cho làm việc và gặp gỡ bạn bè.",
      services: [
        "Cà phê Việt Nam",
        "Cà phê Espresso",
        "Trà sữa",
        "Bánh ngọt",
        "WiFi miễn phí",
        "Không gian làm việc",
      ],
      amenities: [
        "WiFi tốc độ cao",
        "Ổ cắm điện",
        "Điều hòa",
        "Nhạc nhẹ",
        "Bãi đỗ xe",
      ],
      priceRange: "25.000đ - 60.000đ",
    },
    {
      id: 2,
      name: "Trạm xăng Petrolimex Số 42",
      rating: 4.2,
      reviews: "1.2k",
      distance: "1.6 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&h=600&fit=crop", // Trạm xăng Petrolimex
      category: "gas",
      address: "42 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
      openHours: "24/7",
      phone: "028 38221122",
      description:
        "Trạm xăng Petrolimex chất lượng cao, đảm bảo xăng đúng chuẩn. Phục vụ nhanh chóng, nhân viên thân thiện.",
      services: [
        "Xăng RON 92",
        "Xăng RON 95",
        "Dầu Diesel",
        "Kiểm tra áp suất lốp",
        "Rửa xe",
        "Cửa hàng tiện lợi",
      ],
      amenities: [
        "Cửa hàng 24/7",
        "Toilet sạch sẽ",
        "Bãi đỗ xe rộng",
        "Camera an ninh",
      ],
      priceRange: "Theo giá niêm yết",
    },
    {
      id: 3,
      name: "Vincom Center",
      rating: 4.6,
      reviews: "5.8k",
      distance: "2.3 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop", // Trung tâm thương mại
      category: "parking",
      address: "72 Lê Thánh Tôn, Quận 1, TP.HCM",
      openHours: "09:30 - 22:00",
      phone: "028 39363636",
      description:
        "Trung tâm thương mại hiện đại với bãi đỗ xe rộng rãi, an toàn. Nằm ở vị trí trung tâm, thuận tiện mua sắm và giải trí.",
      services: [
        "Bãi đỗ xe ô tô",
        "Bãi đỗ xe máy",
        "Trung tâm thương mại",
        "Rạp chiếu phim",
        "Khu ẩm thực",
        "Siêu thị",
      ],
      amenities: ["Thang máy", "Toilet", "ATM", "WiFi", "Bảo vệ 24/7"],
      priceRange: "10.000đ/giờ (xe máy), 20.000đ/giờ (ô tô)",
    },
    {
      id: 4,
      name: "Highlands Coffee",
      rating: 4.4,
      reviews: "1.8k",
      distance: "1.1 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop", // Highlands Coffee
      category: "coffee",
      address: "54 Pasteur, Quận 1, TP.HCM",
      openHours: "07:00 - 22:30",
      phone: "028 38229408",
      description:
        "Highlands Coffee - thương hiệu cà phê Việt với không gian sang trọng, phong cách hiện đại.",
      services: [
        "Cà phê phin",
        "Freeze",
        "Trà trái cây",
        "Bánh ngọt",
        "Món ăn nhẹ",
      ],
      amenities: ["WiFi", "Điều hòa", "Nhạc nhẹ", "Không gian yên tĩnh"],
      priceRange: "30.000đ - 70.000đ",
    },
    {
      id: 5,
      name: "Trạm xăng Shell",
      rating: 4.3,
      reviews: "980",
      distance: "2.8 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1577724637750-c3678c8ebc36?w=800&h=600&fit=crop", // Trạm xăng Shell
      category: "gas",
      address: "123 Xa Lộ Hà Nội, Quận 2, TP.HCM",
      openHours: "24/7",
      phone: "028 37445566",
      description:
        "Trạm xăng Shell với xăng nhập khẩu chất lượng cao, kèm chất phụ gia V-Power giúp bảo vệ động cơ.",
      services: [
        "V-Power Racing",
        "Diesel",
        "Cửa hàng Shell Select",
        "Rửa xe tự động",
      ],
      amenities: ["Cửa hàng tiện lợi", "Khu vực nghỉ chân", "ATM"],
      priceRange: "Theo giá niêm yết + phụ gia",
    },
    {
      id: 6,
      name: "Bãi đỗ xe Diamond Plaza",
      rating: 4.1,
      reviews: "650",
      distance: "1.9 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=600&fit=crop", // Bãi đỗ xe trong nhà
      category: "parking",
      address: "34 Lê Duẩn, Quận 1, TP.HCM",
      openHours: "08:00 - 22:00",
      phone: "028 38222555",
      description:
        "Bãi đỗ xe hiện đại trong tòa nhà Diamond Plaza, an ninh tốt.",
      services: ["Đỗ xe ô tô", "Đỗ xe máy", "Giữ xe qua đêm"],
      amenities: ["Camera giám sát", "Bảo vệ", "Thang máy"],
      priceRange: "15.000đ/giờ",
    },
    {
      id: 7,
      name: "Phở 24",
      rating: 4.7,
      reviews: "3.2k",
      distance: "0.5 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=600&fit=crop", // Phở Việt Nam
      category: "food",
      address: "5 Nguyễn Thiệp, Quận 1, TP.HCM",
      openHours: "06:00 - 02:00",
      phone: "028 38222788",
      description:
        "Chuỗi phở nổi tiếng với hương vị truyền thống Hà Nội, phục vụ gần như 24/7.",
      services: ["Phở bò", "Phở gà", "Bún chả", "Nem rán", "Gỏi cuốn"],
      amenities: ["Phục vụ nhanh", "Sạch sẽ", "Giá cả phải chăng"],
      priceRange: "50.000đ - 120.000đ",
    },
    {
      id: 8,
      name: "Starbucks Reserve",
      rating: 4.8,
      reviews: "4.1k",
      distance: "1.4 km",
      status: "MỞ CỬA",
      image:
        "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&h=600&fit=crop", // Starbucks interior
      category: "coffee",
      address: "The Opera Apartment, 22A Lê Duẩn, Q1, HCM",
      openHours: "07:00 - 23:00",
      phone: "028 38272828",
      description:
        "Starbucks Reserve - không gian cao cấp với các loại cà phê đặc biệt và phương pháp pha chế độc đáo.",
      services: [
        "Reserve Coffee",
        "Espresso Bar",
        "Cocktails",
        "Bánh ngọt cao cấp",
        "Merchandise",
      ],
      amenities: [
        "Không gian sang trọng",
        "WiFi tốc độ cao",
        "Ổ cắm điện",
        "View đẹp",
      ],
      priceRange: "60.000đ - 200.000đ",
    },
  ];

  // ==========================================
  // THÊM ẢNH CHO SERVICE CARDS Ở MAIN SCREEN
  // Cập nhật trong renderMainScreen()
  // ==========================================

  // Service card images - Cập nhật trong render:
  /*
Cứu hộ: https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop
Sửa xe: https://images.unsplash.com/photo-1632823469883-d8f8b6b5d9a5?w=400&h=300&fit=crop
Trạm sạc: https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop
ATM: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop
*/

  // ==================== HELPER FUNCTIONS ====================
  const handleServicePress = (
    service: "rescue" | "repair" | "charging" | "atm",
  ) => {
    setCurrentScreen(service);
  };

  const handleBackPress = () => {
    if (currentScreen === "placeDetail") {
      setCurrentScreen("main");
      setSelectedPlace(null);
    } else {
      setCurrentScreen("main");
      setSelectedFilter("all");
    }
  };

  const handleDirectionPress = () => {
    router.push("/");
  };

  const handleSeeAllPress = () => {
    setCurrentScreen("allPlaces");
  };

  const handleFilterPress = (filter: string) => {
    console.log("Filter selected:", filter);
    setSelectedFilter(filter);
  };

  const toggleFilterOption = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters((prev) => prev.filter((id) => id !== filterId));
  };

  const applyFilters = () => {
    console.log("Applied filters:", selectedFilters);
    if (selectedFilters.length === 0) {
      setSelectedFilter("all");
    } else if (selectedFilters.length === 1) {
      setSelectedFilter(selectedFilters[0]);
    } else {
      setSelectedFilter("multiple");
    }
    setFilterModalVisible(false);
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const getFilteredPlaces = (): Place[] => {
    if (selectedFilters.length === 0) {
      return allPlaces;
    }
    return allPlaces.filter((place) =>
      selectedFilters.includes(place.category),
    );
  };

  const handlePlacePress = (place: Place | ServiceProvider) => {
    setSelectedPlace(place);
    setCurrentScreen("placeDetail");
  };

  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  // ==================== KẾT THÚC PHẦN 1 ====================
  // TIẾP TỤC VỚI PHẦN 2 (Render Functions và Styles)
  // ==========================================
  // FILE: app/explore.tsx - PHẦN 2
  // Ghép PHẦN 2 này vào sau PHẦN 1 (xóa dòng comment cuối PART 1)
  // ==========================================

  // ==================== RENDER PLACE DETAIL SCREEN ====================
  const renderPlaceDetailScreen = () => {
    if (!selectedPlace) return null;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          {/* Header với nút back và share */}
          <View style={styles.detailHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <MaterialCommunityIcons
                name="share-variant"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.detailContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Image Hero */}
            <View style={styles.detailImageContainer}>
              <Image
                source={{ uri: selectedPlace.image }}
                style={styles.detailImage}
              />
            </View>

            {/* Main Info */}
            <View style={styles.detailMainInfo}>
              <Text style={styles.detailTitle}>{selectedPlace.name}</Text>

              {/* Rating and Status */}
              <View style={styles.detailMetaRow}>
                <View style={styles.detailRating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color="#ffd93d"
                  />
                  <Text style={styles.detailRatingText}>
                    {selectedPlace.rating}
                  </Text>
                  <Text style={styles.detailReviewCount}>
                    ({selectedPlace.reviews} đánh giá)
                  </Text>
                </View>
                <View style={styles.detailStatusBadge}>
                  <View style={styles.detailStatusDot} />
                  <Text style={styles.detailStatusText}>
                    {selectedPlace.status}
                  </Text>
                </View>
              </View>

              {/* Price Range */}
              {selectedPlace.priceRange && (
                <View style={styles.detailPriceRow}>
                  <MaterialCommunityIcons
                    name="cash"
                    size={18}
                    color="#00f2ff"
                  />
                  <Text style={styles.detailPriceText}>
                    {selectedPlace.priceRange}
                  </Text>
                </View>
              )}
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={handleDirectionPress}
              >
                <View style={styles.quickActionIcon}>
                  <MaterialCommunityIcons
                    name="directions"
                    size={24}
                    color="#00f2ff"
                  />
                </View>
                <Text style={styles.quickActionText}>Chỉ đường</Text>
              </TouchableOpacity>

              {selectedPlace.phone && (
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => handleCallPress(selectedPlace.phone!)}
                >
                  <View style={styles.quickActionIcon}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={24}
                      color="#00f2ff"
                    />
                  </View>
                  <Text style={styles.quickActionText}>Gọi điện</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.quickActionButton}>
                <View style={styles.quickActionIcon}>
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    size={24}
                    color="#00f2ff"
                  />
                </View>
                <Text style={styles.quickActionText}>Lưu</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionButton}>
                <View style={styles.quickActionIcon}>
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="#00f2ff"
                  />
                </View>
                <Text style={styles.quickActionText}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>

            {/* Information Sections */}
            <View style={styles.detailSections}>
              {/* Address */}
              {selectedPlace.address && (
                <View style={styles.detailSection}>
                  <View style={styles.detailSectionHeader}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={20}
                      color="#00f2ff"
                    />
                    <Text style={styles.detailSectionTitle}>Địa chỉ</Text>
                  </View>
                  <Text style={styles.detailSectionContent}>
                    {selectedPlace.address}
                  </Text>
                  <Text style={styles.detailDistanceText}>
                    Cách bạn {selectedPlace.distance}
                  </Text>
                </View>
              )}

              {/* Opening Hours */}
              {selectedPlace.openHours && (
                <View style={styles.detailSection}>
                  <View style={styles.detailSectionHeader}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={20}
                      color="#00f2ff"
                    />
                    <Text style={styles.detailSectionTitle}>Giờ hoạt động</Text>
                  </View>
                  <Text style={styles.detailSectionContent}>
                    {selectedPlace.openHours}
                  </Text>
                </View>
              )}

              {/* Contact */}
              {selectedPlace.phone && (
                <View style={styles.detailSection}>
                  <View style={styles.detailSectionHeader}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={20}
                      color="#00f2ff"
                    />
                    <Text style={styles.detailSectionTitle}>Liên hệ</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleCallPress(selectedPlace.phone!)}
                  >
                    <Text style={styles.detailPhoneNumber}>
                      {selectedPlace.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Description */}
              {selectedPlace.description && (
                <View style={styles.detailSection}>
                  <View style={styles.detailSectionHeader}>
                    <MaterialCommunityIcons
                      name="information"
                      size={20}
                      color="#00f2ff"
                    />
                    <Text style={styles.detailSectionTitle}>Giới thiệu</Text>
                  </View>
                  <Text style={styles.detailSectionContent}>
                    {selectedPlace.description}
                  </Text>
                </View>
              )}

              {/* Services */}
              {selectedPlace.services && selectedPlace.services.length > 0 && (
                <View style={styles.detailSection}>
                  <View style={styles.detailSectionHeader}>
                    <MaterialCommunityIcons
                      name="briefcase"
                      size={20}
                      color="#00f2ff"
                    />
                    <Text style={styles.detailSectionTitle}>Dịch vụ</Text>
                  </View>
                  <View style={styles.servicesList}>
                    {selectedPlace.services.map((service, index) => (
                      <View key={index} style={styles.serviceItem}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={16}
                          color="#6bcf7f"
                        />
                        <Text style={styles.serviceItemText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Amenities */}
              {selectedPlace.amenities &&
                selectedPlace.amenities.length > 0 && (
                  <View style={styles.detailSection}>
                    <View style={styles.detailSectionHeader}>
                      <MaterialCommunityIcons
                        name="star-box"
                        size={20}
                        color="#00f2ff"
                      />
                      <Text style={styles.detailSectionTitle}>Tiện ích</Text>
                    </View>
                    <View style={styles.amenitiesList}>
                      {selectedPlace.amenities.map((amenity, index) => (
                        <View key={index} style={styles.amenityChip}>
                          <Text style={styles.amenityChipText}>{amenity}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Bottom Action Bar */}
          <View style={styles.detailBottomBar}>
            <TouchableOpacity
              style={styles.detailDirectionButton}
              onPress={handleDirectionPress}
            >
              <MaterialCommunityIcons
                name="navigation"
                size={20}
                color="#000000"
              />
              <Text style={styles.detailDirectionButtonText}>
                Bắt đầu dẫn đường
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <MainTab />
      </View>
    );
  };

  // ==================== RENDER SERVICE DETAIL SCREEN ====================
  const renderServiceDetail = (
    title: string,
    icon: string,
    providers: ServiceProvider[],
  ) => (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#ffffff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons
              name="tune-variant"
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={24} color="#00f2ff" />
            <TextInput
              style={styles.searchInput}
              placeholder={`Tìm ${title.toLowerCase()}...`}
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.mainContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.nearbySection}>
            <View style={styles.nearbySectionHeader}>
              <Text style={styles.sectionTitle}>{title} gần bạn</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>
                  {providers.length} địa điểm
                </Text>
              </TouchableOpacity>
            </View>

            {providers.map((provider) => (
              <TouchableOpacity
                key={provider.id}
                style={styles.placeCard}
                onPress={() => handlePlacePress(provider)}
              >
                <View style={styles.placeImageContainer}>
                  <Image
                    source={{ uri: provider.image }}
                    style={styles.placeImage}
                  />
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeTitle}>{provider.name}</Text>
                  <View style={styles.placeRating}>
                    <MaterialCommunityIcons
                      name="star"
                      size={14}
                      color="#ffd93d"
                    />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                    <Text style={styles.reviewCount}>
                      ({provider.reviews} đánh giá)
                    </Text>
                  </View>
                  <View style={styles.placeDistance}>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{provider.status}</Text>
                    </View>
                    <Text style={styles.distanceText}>
                      • {provider.distance}
                    </Text>
                  </View>
                  <View style={styles.phoneContainer}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={14}
                      color="#00f2ff"
                    />
                    <Text style={styles.phoneText}>{provider.phone}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={handleDirectionPress}
                >
                  <MaterialCommunityIcons
                    name="directions"
                    size={20}
                    color="#00f2ff"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
      <MainTab />
    </View>
  );

  // ==================== RENDER ALL PLACES SCREEN ====================
  const renderAllPlacesScreen = () => {
    const filteredPlaces = getFilteredPlaces();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tất cả địa điểm</Text>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="tune-variant"
                size={24}
                color="#ffffff"
              />
              {selectedFilters.length > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>
                    {selectedFilters.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#00f2ff"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm địa điểm..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickFiltersContainer}
            contentContainerStyle={styles.quickFiltersContent}
          >
            <TouchableOpacity
              style={[
                styles.quickFilterChip,
                selectedFilter === "all" && styles.quickFilterChipActive,
              ]}
              onPress={() => {
                setSelectedFilter("all");
                setSelectedFilters([]);
              }}
            >
              <MaterialCommunityIcons
                name="view-grid"
                size={14}
                color={selectedFilter === "all" ? "#000000" : "#ffffff"}
              />
              <Text
                style={
                  selectedFilter === "all"
                    ? styles.quickFilterTextActive
                    : styles.quickFilterText
                }
              >
                Tất cả
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickFilterChip,
                selectedFilters.includes("food") &&
                  styles.quickFilterChipActive,
              ]}
              onPress={() => {
                setSelectedFilter("food");
                setSelectedFilters(["food"]);
              }}
            >
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={14}
                color={selectedFilters.includes("food") ? "#000000" : "#ffffff"}
              />
              <Text
                style={
                  selectedFilters.includes("food")
                    ? styles.quickFilterTextActive
                    : styles.quickFilterText
                }
              >
                Ăn uống
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickFilterChip,
                selectedFilters.includes("coffee") &&
                  styles.quickFilterChipActive,
              ]}
              onPress={() => {
                setSelectedFilter("coffee");
                setSelectedFilters(["coffee"]);
              }}
            >
              <MaterialCommunityIcons
                name="coffee"
                size={14}
                color={
                  selectedFilters.includes("coffee") ? "#000000" : "#ffffff"
                }
              />
              <Text
                style={
                  selectedFilters.includes("coffee")
                    ? styles.quickFilterTextActive
                    : styles.quickFilterText
                }
              >
                Cà phê
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickFilterChip,
                selectedFilters.includes("gas") && styles.quickFilterChipActive,
              ]}
              onPress={() => {
                setSelectedFilter("gas");
                setSelectedFilters(["gas"]);
              }}
            >
              <MaterialCommunityIcons
                name="gas-station"
                size={14}
                color={selectedFilters.includes("gas") ? "#000000" : "#ffffff"}
              />
              <Text
                style={
                  selectedFilters.includes("gas")
                    ? styles.quickFilterTextActive
                    : styles.quickFilterText
                }
              >
                Trạm xăng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickFilterChip,
                selectedFilters.includes("parking") &&
                  styles.quickFilterChipActive,
              ]}
              onPress={() => {
                setSelectedFilter("parking");
                setSelectedFilters(["parking"]);
              }}
            >
              <MaterialCommunityIcons
                name="parking"
                size={14}
                color={
                  selectedFilters.includes("parking") ? "#000000" : "#ffffff"
                }
              />
              <Text
                style={
                  selectedFilters.includes("parking")
                    ? styles.quickFilterTextActive
                    : styles.quickFilterText
                }
              >
                Bãi đỗ xe
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {selectedFilters.length > 0 && (
            <View style={styles.activeFiltersContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activeFiltersContent}
              >
                {selectedFilters.map((filterId) => {
                  const filter = filterOptions.find((f) => f.id === filterId);
                  if (!filter) return null;

                  return (
                    <View key={filterId} style={styles.activeFilterChip}>
                      <MaterialCommunityIcons
                        name={filter.icon as any}
                        size={14}
                        color="#000000"
                      />
                      <Text style={styles.activeFilterText}>
                        {filter.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeFilter(filterId)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={16}
                          color="#000000"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.mainContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.nearbySection}>
              <View style={styles.nearbySectionHeader}>
                <Text style={styles.sectionTitle}>
                  {filteredPlaces.length} địa điểm
                </Text>
              </View>

              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <TouchableOpacity
                    key={place.id}
                    style={styles.placeCard}
                    onPress={() => handlePlacePress(place)}
                  >
                    <View style={styles.placeImageContainer}>
                      <Image
                        source={{ uri: place.image }}
                        style={styles.placeImage}
                      />
                    </View>
                    <View style={styles.placeInfo}>
                      <Text style={styles.placeTitle}>{place.name}</Text>
                      <View style={styles.placeRating}>
                        <MaterialCommunityIcons
                          name="star"
                          size={14}
                          color="#ffd93d"
                        />
                        <Text style={styles.ratingText}>{place.rating}</Text>
                        <Text style={styles.reviewCount}>
                          ({place.reviews} đánh giá)
                        </Text>
                      </View>
                      <View style={styles.placeDistance}>
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusText}>{place.status}</Text>
                        </View>
                        <Text style={styles.distanceText}>
                          • {place.distance}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.directionButton}
                      onPress={handleDirectionPress}
                    >
                      <MaterialCommunityIcons
                        name="directions"
                        size={20}
                        color="#00f2ff"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons
                    name="map-marker-off"
                    size={64}
                    color="rgba(255,255,255,0.2)"
                  />
                  <Text style={styles.emptyText}>
                    Không tìm thấy địa điểm nào
                  </Text>
                  <TouchableOpacity
                    style={styles.resetFiltersButton}
                    onPress={clearAllFilters}
                  >
                    <Text style={styles.resetFiltersButtonText}>
                      Xóa bộ lọc
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>

        {/* Filter Modal */}
        <Modal
          visible={filterModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bộ lọc địa điểm</Text>
                <TouchableOpacity
                  onPress={() => setFilterModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.categoryTabsContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryTabs}
                >
                  <TouchableOpacity
                    style={[styles.categoryTab, styles.categoryTabActive]}
                  >
                    <Text style={styles.categoryTabTextActive}>Tất cả</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Dịch vụ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Xe cộ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Tiện ích</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {selectedFilters.length > 0 && (
                <View style={styles.selectedFiltersContainer}>
                  <View style={styles.selectedFiltersHeader}>
                    <Text style={styles.selectedFiltersTitle}>
                      Đã chọn ({selectedFilters.length})
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.selectedFiltersList}
                  >
                    {selectedFilters.map((filterId) => {
                      const filter = filterOptions.find(
                        (f) => f.id === filterId,
                      );
                      if (!filter) return null;
                      return (
                        <View key={filterId} style={styles.selectedFilterChip}>
                          <MaterialCommunityIcons
                            name={filter.icon as any}
                            size={16}
                            color="#000000"
                          />
                          <Text style={styles.selectedFilterText}>
                            {filter.label}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeFilter(filterId)}
                          >
                            <MaterialCommunityIcons
                              name="close-circle"
                              size={18}
                              color="#000000"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              <ScrollView
                style={styles.filterOptionsScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.filterOptionsGrid}>
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilters.includes(option.id);
                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.filterOptionChip,
                          isSelected && styles.filterOptionChipActive,
                        ]}
                        onPress={() => toggleFilterOption(option.id)}
                      >
                        <MaterialCommunityIcons
                          name={option.icon as any}
                          size={16}
                          color={
                            isSelected ? "#00f2ff" : "rgba(255,255,255,0.7)"
                          }
                        />
                        <Text
                          style={[
                            styles.filterOptionChipText,
                            isSelected && styles.filterOptionChipTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={18}
                            color="#00f2ff"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={clearAllFilters}
                >
                  <Text style={styles.resetButtonText}>Bỏ chọn tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={applyFilters}
                >
                  <Text style={styles.applyButtonText}>
                    Áp dụng{" "}
                    {selectedFilters.length > 0
                      ? `(${selectedFilters.length})`
                      : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <MainTab />
      </View>
    );
  };

  // ==================== RENDER MAIN SCREEN ====================
  const renderMainScreen = () => {
    const displayPlaces = getFilteredPlaces().slice(0, 3);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <MaterialCommunityIcons
                name="compass-outline"
                size={24}
                color="#00f2ff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.headerTitle}>Khám phá</Text>
            </View>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="tune-variant"
                size={24}
                color="#ffffff"
              />
              {selectedFilters.length > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>
                    {selectedFilters.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#00f2ff"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm địa điểm, sự kiện..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.mainContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedFilters.length > 0 && (
              <View style={styles.activeFiltersContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.activeFiltersContent}
                >
                  {selectedFilters.map((filterId) => {
                    const filter = filterOptions.find((f) => f.id === filterId);
                    if (!filter) return null;

                    return (
                      <View key={filterId} style={styles.activeFilterChip}>
                        <MaterialCommunityIcons
                          name={filter.icon as any}
                          size={14}
                          color="#000000"
                        />
                        <Text style={styles.activeFilterText}>
                          {filter.label}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeFilter(filterId)}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={16}
                            color="#000000"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  <TouchableOpacity
                    style={styles.clearAllFiltersButton}
                    onPress={clearAllFilters}
                  >
                    <Text style={styles.clearAllFiltersText}>Xóa tất cả</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}

            <View style={styles.serviceGrid}>
              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => handleServicePress("rescue")}
              >
                <View style={styles.serviceImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1577720643272-265f434b0b49?w=400&h=300&fit=crop",
                    }}
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Cứu hộ giao thông</Text>
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={16}
                    color="#00f2ff"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => handleServicePress("repair")}
              >
                <View style={styles.serviceImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1487573202841-e86815d4e0de?w=400&h=300&fit=crop",
                    }}
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Sửa xe 24/7</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => handleServicePress("charging")}
              >
                <View style={styles.serviceImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
                    }}
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Trạm sạc EV</Text>
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={16}
                    color="#00f2ff"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => handleServicePress("atm")}
              >
                <View style={styles.serviceImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1563013544-824ae1bf4e55?w=400&h=300&fit=crop",
                    }}
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>ATM</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.nearbySection}>
              <View style={styles.nearbySectionHeader}>
                <Text style={styles.sectionTitle}>
                  Địa điểm nổi bật gần bạn
                </Text>
                <TouchableOpacity onPress={handleSeeAllPress}>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              {displayPlaces.length > 0 ? (
                displayPlaces.map((place) => (
                  <TouchableOpacity
                    key={place.id}
                    style={styles.placeCard}
                    onPress={() => handlePlacePress(place)}
                  >
                    <View style={styles.placeImageContainer}>
                      <Image
                        source={{ uri: place.image }}
                        style={styles.placeImage}
                      />
                    </View>
                    <View style={styles.placeInfo}>
                      <Text style={styles.placeTitle}>{place.name}</Text>
                      <View style={styles.placeRating}>
                        <MaterialCommunityIcons
                          name="star"
                          size={14}
                          color="#ffd93d"
                        />
                        <Text style={styles.ratingText}>{place.rating}</Text>
                        <Text style={styles.reviewCount}>
                          ({place.reviews} đánh giá)
                        </Text>
                      </View>
                      <View style={styles.placeDistance}>
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusText}>{place.status}</Text>
                        </View>
                        <Text style={styles.distanceText}>
                          • {place.distance}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.directionButton}
                      onPress={handleDirectionPress}
                    >
                      <MaterialCommunityIcons
                        name="directions"
                        size={20}
                        color="#00f2ff"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Không tìm thấy địa điểm nào
                  </Text>
                </View>
              )}
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>

        {/* Filter Modal - Same as All Places Screen */}
        <Modal
          visible={filterModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bộ lọc địa điểm</Text>
                <TouchableOpacity
                  onPress={() => setFilterModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.categoryTabsContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryTabs}
                >
                  <TouchableOpacity
                    style={[styles.categoryTab, styles.categoryTabActive]}
                  >
                    <Text style={styles.categoryTabTextActive}>Tất cả</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Dịch vụ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Xe cộ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryTab}>
                    <Text style={styles.categoryTabText}>Tiện ích</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {selectedFilters.length > 0 && (
                <View style={styles.selectedFiltersContainer}>
                  <View style={styles.selectedFiltersHeader}>
                    <Text style={styles.selectedFiltersTitle}>
                      Đã chọn ({selectedFilters.length})
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.selectedFiltersList}
                  >
                    {selectedFilters.map((filterId) => {
                      const filter = filterOptions.find(
                        (f) => f.id === filterId,
                      );
                      if (!filter) return null;
                      return (
                        <View key={filterId} style={styles.selectedFilterChip}>
                          <MaterialCommunityIcons
                            name={filter.icon as any}
                            size={16}
                            color="#000000"
                          />
                          <Text style={styles.selectedFilterText}>
                            {filter.label}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeFilter(filterId)}
                          >
                            <MaterialCommunityIcons
                              name="close-circle"
                              size={18}
                              color="#000000"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              <ScrollView
                style={styles.filterOptionsScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.filterOptionsGrid}>
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilters.includes(option.id);
                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.filterOptionChip,
                          isSelected && styles.filterOptionChipActive,
                        ]}
                        onPress={() => toggleFilterOption(option.id)}
                      >
                        <MaterialCommunityIcons
                          name={option.icon as any}
                          size={16}
                          color={
                            isSelected ? "#00f2ff" : "rgba(255,255,255,0.7)"
                          }
                        />
                        <Text
                          style={[
                            styles.filterOptionChipText,
                            isSelected && styles.filterOptionChipTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={18}
                            color="#00f2ff"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={clearAllFilters}
                >
                  <Text style={styles.resetButtonText}>Bỏ chọn tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={applyFilters}
                >
                  <Text style={styles.applyButtonText}>
                    Áp dụng{" "}
                    {selectedFilters.length > 0
                      ? `(${selectedFilters.length})`
                      : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <MainTab />
      </View>
    );
  };

  // ==================== MAIN RENDER ====================
  if (currentScreen === "placeDetail") {
    return renderPlaceDetailScreen();
  } else if (currentScreen === "main") {
    return renderMainScreen();
  } else if (currentScreen === "rescue") {
    return renderServiceDetail(
      "Cứu hộ giao thông",
      "car-side",
      rescueProviders,
    );
  } else if (currentScreen === "repair") {
    return renderServiceDetail("Sửa xe 24/7", "wrench", repairProviders);
  } else if (currentScreen === "charging") {
    return renderServiceDetail("Trạm sạc EV", "ev-station", chargingProviders);
  } else if (currentScreen === "atm") {
    return renderServiceDetail("ATM", "cash-multiple", atmProviders);
  } else if (currentScreen === "allPlaces") {
    return renderAllPlacesScreen();
  }

  return null;
}

// ==================== STYLES - PART 2A ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },
  filterButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    position: "relative",
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#00f2ff",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  filterBadgeText: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "700",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    paddingBottom: 32,
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  activeFiltersContent: {
    gap: 8,
    paddingRight: 16,
  },
  activeFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00f2ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  activeFilterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  clearAllFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(255,56,100,0.2)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff3864",
    justifyContent: "center",
  },
  clearAllFiltersText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff3864",
  },
  quickFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quickFiltersContent: {
    gap: 8,
    paddingRight: 16,
  },
  quickFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minHeight: 32,
  },
  quickFilterChipActive: {
    backgroundColor: "#00f2ff",
    borderColor: "#00f2ff",
  },
  quickFilterText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  quickFilterTextActive: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
    marginTop: 8,
  },
  serviceCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  serviceImageContainer: {
    width: "100%",
    aspectRatio: 1.5,
  },
  serviceImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  serviceInfo: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
  },
  nearbySection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  nearbySectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00f2ff",
  },
  placeCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    gap: 12,
  },
  placeImageContainer: {
    width: 64,
    height: 64,
  },
  placeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  placeInfo: {
    flex: 1,
    gap: 4,
  },
  placeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
  },
  placeRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },
  reviewCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  placeDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusBadge: {
    backgroundColor: "rgba(107,207,127,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6bcf7f",
    letterSpacing: 0.5,
  },
  distanceText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
  directionButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,242,255,0.1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,242,255,0.3)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  phoneText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00f2ff",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 16,
  },
  resetFiltersButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0,242,255,0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00f2ff",
  },
  resetFiltersButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00f2ff",
  },

  // ==================== MODAL STYLES ====================
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0a0a0a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
  },
  categoryTabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  categoryTabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  categoryTabActive: {
    backgroundColor: "#00f2ff",
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
  },
  categoryTabTextActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  selectedFiltersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  selectedFiltersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  selectedFiltersTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  selectedFiltersList: {
    flexDirection: "row",
  },
  selectedFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00f2ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  selectedFilterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  filterOptionsScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
  },
  filterOptionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  filterOptionChipActive: {
    backgroundColor: "rgba(0,242,255,0.15)",
    borderColor: "#00f2ff",
  },
  filterOptionChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  filterOptionChipTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#00f2ff",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },

  // ==================== PLACE DETAIL SCREEN STYLES ====================
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  shareButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
  },
  detailContent: {
    paddingBottom: 32,
  },
  detailImageContainer: {
    width: "100%",
    height: 280,
  },
  detailImage: {
    width: "100%",
    height: "100%",
  },
  detailMainInfo: {
    padding: 20,
    backgroundColor: "#000000",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    lineHeight: 32,
  },
  detailMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailRatingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  detailReviewCount: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  detailStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(107,207,127,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  detailStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6bcf7f",
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6bcf7f",
    letterSpacing: 0.5,
  },
  detailPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailPriceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00f2ff",
  },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  quickActionButton: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,242,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,242,255,0.3)",
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },

  // Detail Sections
  detailSections: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  detailSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  detailSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  detailSectionContent: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
  },
  detailDistanceText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginTop: 8,
  },
  detailPhoneNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00f2ff",
    textDecorationLine: "underline",
  },

  // Services List
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceItemText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    flex: 1,
  },

  // Amenities
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityChip: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  amenityChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },

  // Bottom Action Bar
  detailBottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    backgroundColor: "#000000",
  },
  detailDirectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00f2ff",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  detailDirectionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
});
