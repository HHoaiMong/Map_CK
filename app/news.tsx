import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
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
import MainTab from "./navigation/MainTab";

interface NewsArticle {
  id: number;
  title: string;
  source: string;
  time: string;
  image: string;
  category?: string;
  keywords?: string[];
  content?: string;
  author?: string;
  readTime?: string;
}

interface FeaturedNews {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "alert";
  isRead: boolean;
}

export default function News() {
  const [currentScreen, setCurrentScreen] = useState<
    "main" | "notifications" | "allNews" | "newsDetail"
  >("main");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Cảnh báo ùn tắc giao thông",
      message:
        "Đường Nguyễn Huệ đang có mật độ giao thông cao. Nên tìm đường khác.",
      time: "10 phút trước",
      type: "warning",
      isRead: false,
    },
    {
      id: 2,
      title: "Thông báo bảo trì đường",
      message: "Cầu Thủ Thiêm sẽ đóng một làn từ 22h-5h sáng để bảo trì.",
      time: "2 giờ trước",
      type: "info",
      isRead: true,
    },
  ]);

  const featuredNews: FeaturedNews = {
    id: 1,
    title: "Nghị định mới về xử phạt vi phạm nồng độ cồn",
    description:
      "Tăng mức phạt tối đa đối với các hành vi điều khiển phương tiện khi có nồng độ cồn.",
    category: "Chính sách mới",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  };

  const allNewsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Thông tin cấm đường cuối tuần tại Quận 1 phục vụ lễ hội",
      source: "Sở GTVT",
      time: "15 phút trước",
      image:
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80",
      keywords: ["cấm đường", "lễ hội", "quận 1"],
      author: "Nguyễn Văn A",
      readTime: "3 phút đọc",
      content: `Sở Giao thông Vận tải TP.HCM thông báo về việc tạm cấm một số tuyến đường tại Quận 1 trong 2 ngày cuối tuần (Thứ 7 và Chủ nhật) để phục vụ tổ chức Lễ hội Văn hóa Đường phố.

**Các tuyến đường bị cấm:**

Từ 6h00 sáng Thứ 7 đến 22h00 Chủ nhật, các phương tiện sẽ không được lưu thông trên:
- Đường Nguyễn Huệ (toàn tuyến)
- Đường Đồng Khởi (từ Công trường Mê Linh đến Tôn Đức Thắng)
- Đường Lê Lợi (đoạn từ Pasteur đến Nguyễn Huệ)

**Phương án đi lại thay thế:**

Người dân có thể sử dụng các tuyến đường sau:
- Đường Hàm Nghi để thay thế cho Nguyễn Huệ
- Đường Nam Kỳ Khởi Nghĩa thay cho Đồng Khởi
- Đường Trần Hưng Đạo song song với Lê Lợi

**Lưu ý quan trọng:**

Cảnh sát giao thông sẽ bố trí lực lượng tại các nút giao thông chính để hướng dẫn phương tiện. Người dân nên cân nhắc sử dụng phương tiện công cộng hoặc di chuyển sớm hơn để tránh ùn tắc.

Ban tổ chức khuyến nghị mọi người tham gia lễ hội nên đi bộ hoặc sử dụng xe buýt, xe buýt điện để giảm thiểu tác động đến giao thông xung quanh.`,
    },
    {
      id: 2,
      title: "Tiến độ thi công cầu Thủ Thiêm 4: Sắp hoàn thiện trụ cầu chính",
      source: "Tin Nhanh",
      time: "1 giờ trước",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
      keywords: ["thi công", "cầu đường", "thủ thiêm"],
      author: "Trần Thị B",
      readTime: "4 phút đọc",
      content: `Dự án cầu Thủ Thiêm 4 đang trong giai đoạn hoàn thiện trụ cầu chính với tiến độ vượt kế hoạch 15%, dự kiến sẽ thông xe vào quý 3/2026.

**Tổng quan dự án:**

Cầu Thủ Thiêm 4 là cây cầu dây văng bắc qua sông Sài Gòn, nối liền Quận 1 và Khu đô thị mới Thủ Thiêm (Quận 2 cũ - nay là TP Thủ Đức). Tổng chiều dài cầu là 1.465m, trong đó nhịp chính dài 400m.

**Tiến độ hiện tại:**

✅ Hoàn thành 100% móng cầu
✅ Hoàn thành 95% trụ cầu chính
✅ Đang lắp đặt hệ thống cáp dây văng
✅ Dự kiến bắt đầu đổ bê tông mặt cầu trong tháng 4

**Ý nghĩa công trình:**

Khi hoàn thành, cầu Thủ Thiêm 4 sẽ:
- Rút ngắn thời gian di chuyển từ trung tâm Quận 1 sang Thủ Đức xuống còn 10 phút
- Giảm tải cho cầu Sài Gòn và Thủ Thiêm 2
- Tạo động lực phát triển kinh tế cho khu vực Đông Sài Gòn

**Lời kêu gọi:**

Đơn vị thi công kêu gọi người dân hạn chế lưu thông qua khu vực thi công vào khung giờ cao điểm (6h-8h và 17h-19h) để đảm bảo an toàn và tiến độ công trình.`,
    },
    {
      id: 3,
      title: "Va chạm liên hoàn trên Cao tốc Long Thành - Dầu Giây gây ùn tắc",
      source: "Cảnh sát GT",
      time: "3 giờ trước",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
      keywords: ["tai nạn", "cao tốc", "ùn tắc"],
      author: "Lê Văn C",
      readTime: "2 phút đọc",
      content: `Vào lúc 8h30 sáng nay, một vụ va chạm liên hoàn giữa 4 phương tiện đã xảy ra tại Km25 cao tốc Long Thành - Dầu Giây theo hướng về Bà Rịa - Vũng Tàu, gây ùn tắc kéo dài hơn 3km.

**Diễn biến sự việc:**

Theo thông tin từ Đội Cảnh sát giao thông cao tốc, vụ việc xảy ra khi một xe container đột ngột giảm tốc độ do lốp xe bị nổ. Phía sau, 3 xe ô tô 7 chỗ không kịp xử lý đã tông vào nhau.

**Thiệt hại:**

🚗 4 phương tiện bị hư hỏng nặng
👥 5 người bị thương nhẹ, đã được đưa đi cấp cứu
⚠️ Làn số 1 và số 2 bị phong tỏa trong 2 tiếng

**Tình hình giao thông:**

Đến 11h30, lực lượng chức năng đã giải tỏa hiện trường, tuy nhiên giao thông vẫn còn chậm do hậu quả ùn tắc. Các phương tiện cần lưu ý:

⚠️ Giảm tốc độ khi qua khu vực
⚠️ Giữ khoảng cách an toàn
⚠️ Theo dõi biển báo và hướng dẫn của CSGT

**Khuyến cáo:**

Tài xế nên kiểm tra kỹ tình trạng xe trước khi lên cao tốc, đặc biệt là hệ thống lốp và phanh. Luôn giữ khoảng cách an toàn tối thiểu 50m với xe phía trước khi chạy trên cao tốc.`,
    },
    {
      id: 4,
      title:
        "Đề xuất chuyển đổi làn đường BRT thành làn ưu tiên đa phương tiện",
      source: "Giao Thông 24h",
      time: "5 giờ trước",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80",
      keywords: ["brt", "làn đường", "chính sách"],
      author: "Phạm Thị D",
      readTime: "5 phút đọc",
      content: `Sở Giao thông Vận tải TP.HCM đang nghiên cứu đề xuất chuyển đổi làn đường BRT (Bus Rapid Transit) thành làn ưu tiên đa phương tiện để tối ưu hóa việc sử dụng hạ tầng giao thông.

**Lý do đề xuất:**

Sau 3 năm vận hành, làn BRT trên các tuyến đường chính như Võ Văn Kiệt, Mai Chí Thọ đang bị lãng phí do:
- Tần suất xe buýt thấp (trung bình 15-20 phút/chuyến)
- Làn BRT chiếm 1/3 diện tích mặt đường nhưng chỉ phục vụ một loại phương tiện
- Gây ùn tắc các làn còn lại vào giờ cao điểm

**Phương án đề xuất:**

**Làn ưu tiên đa phương tiện sẽ cho phép:**
✅ Xe buýt công cộng
✅ Xe cứu thương, cứu hỏa
✅ Xe chở học sinh
✅ Xe có 3 người trở lên (HOV - High Occupancy Vehicle)

**Lợi ích dự kiến:**

📊 Tăng hiệu quả sử dụng làn đường lên 300%
⏱️ Giảm thời gian di chuyển trung bình 20%
🌱 Khuyến khích đi chung xe, giảm phát thải

**Ý kiến chuyên gia:**

TS. Nguyễn Văn Quỳnh (Đại học Bách Khoa TP.HCM) cho rằng: "Đây là giải pháp hợp lý trong bối cảnh mật độ giao thông ngày càng tăng. Tuy nhiên cần có hệ thống camera giám sát và xử phạt nghiêm để tránh lạm dụng."

**Lộ trình thực hiện:**

Nếu được phê duyệt, dự kiến sẽ:
- Tháng 6/2026: Triển khai thí điểm trên tuyến Võ Văn Kiệt
- Tháng 9/2026: Đánh giá và mở rộng sang các tuyến khác
- Tháng 12/2026: Áp dụng toàn thành phố

Sở GTVT đang lấy ý kiến góp ý từ người dân qua website chính thức đến hết tháng 3/2026.`,
    },
    {
      id: 5,
      title: "Khai trương tuyến Metro số 1: Bến Thành - Suối Tiên",
      source: "Metro HCM",
      time: "1 ngày trước",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
      keywords: ["metro", "tàu điện", "khai trương"],
      author: "Hoàng Văn E",
      readTime: "6 phút đọc",
      content: `Sau 12 năm thi công, tuyến Metro số 1 Bến Thành - Suối Tiên chính thức khai trương vào sáng nay với sự tham dự của hàng nghìn người dân háo hức trải nghiệm.

**Thông tin tuyến Metro:**

🚇 Chiều dài: 19.7km
🚉 Số trạm: 14 trạm (3 ngầm, 11 trên cao)
⏱️ Thời gian vận hành: 5h00 - 23h00
💰 Giá vé: 7,000đ - 20,000đ tùy quãng đường
🚄 Tốc độ tối đa: 80km/h

**Các trạm chính:**

1. Bến Thành (ngầm) - trung tâm Quận 1
2. Nhà hát Thành phố (ngầm)
3. Ba Son (ngầm)
4. Văn Thánh
5. Tân Cảng
6. Thảo Điền
7. An Phú
8. Rạch Chiếc
9. Phước Long
10. Bình Thái
11. Thủ Đức
12. Khu Công Nghệ Cao
13. Suối Tiên

**Lợi ích mang lại:**

🌟 **Cho người dân:**
- Di chuyển từ Bến Thành đến Suối Tiên chỉ mất 30 phút (thay vì 1.5-2 tiếng)
- Tránh kẹt xe hoàn toàn
- An toàn, thoải mái, điều hòa mát mẻ

🌍 **Cho môi trường:**
- Giảm 200,000 lượt xe máy/ngày
- Giảm 30% phát thải CO2 trên tuyến
- Cải thiện chất lượng không khí

💼 **Cho kinh tế:**
- Tăng giá trị bất động sản gần ga Metro 20-30%
- Tạo 5,000 việc làm trực tiếp và gián tiếp
- Thúc đẩy phát triển khu vực Thủ Đức

**Trải nghiệm khách hàng:**

Chị Nguyễn Thị Lan (32 tuổi, Quận 2) chia sẻ: "Tôi đã thử đi Metro sáng nay và cực kỳ ấn tượng. Sạch sẽ, nhanh chóng và điều hòa rất mát. Từ giờ tôi sẽ đi Metro thay vì xe máy để đi làm."

**Kế hoạch tương lai:**

Ban Quản lý đường sắt đô thị cho biết sẽ tiếp tục:
- Tháng 6/2026: Khai trương tuyến số 2 (Bến Thành - Tham Lương)
- 2027: Khởi công tuyến số 3, 4, 5
- 2030: Hoàn thành mạng lưới Metro với 6 tuyến chính

Tuyến Metro số 1 dự kiến phục vụ 500,000 lượt khách/ngày, góp phần giải quyết bài toán ùn tắc giao thông lâu nay của TP.HCM.`,
    },
    {
      id: 6,
      title: "Cảnh sát giao thông ra quân xử phạt không đội mũ bảo hiểm",
      source: "CSGT TP.HCM",
      time: "1 ngày trước",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
      keywords: ["csgt", "xử phạt", "mũ bảo hiểm"],
      author: "Đỗ Văn F",
      readTime: "3 phút đọc",
      content: `Từ sáng nay, lực lượng CSGT TP.HCM đã triển khai đợt cao điểm xử lý vi phạm không đội mũ bảo hiểm trên toàn thành phố, nhằm nâng cao ý thức chấp hành luật giao thông.

**Quy định mới:**

Theo Nghị định 168/2024/NĐ-CP có hiệu lực từ 01/01/2026, mức phạt đã được tăng lên:

⚠️ **Mức phạt vi phạm:**
- Không đội mũ bảo hiểm: 800,000đ - 1,200,000đ
- Đội không cài quai: 400,000đ - 600,000đ
- Đội mũ không đạt chuẩn: 600,000đ - 1,000,000đ
- Chở trẻ em không đội mũ: 1,500,000đ - 2,000,000đ

**Kết quả ngày đầu:**

📊 Số liệu đến 17h00:
- Tổng số xe dừng kiểm tra: 15,247 xe
- Số trường hợp vi phạm: 3,856 trường hợp
- Tổng tiền phạt: hơn 3.2 tỷ đồng
- Số mũ bảo hiểm tạm giữ: 287 chiếc

**Những điểm kiểm tra trọng điểm:**

🚦 Khu vực trường học (giờ tan học)
🚦 Các khu chợ, chợ đêm
🚦 Khu công nghiệp
🚦 Các tuyến đường huyết mạch

**Cảnh báo từ CSGT:**

Thiếu tá Trần Văn Minh (Phòng CSGT TP.HCM) nhấn mạnh: "Đội mũ bảo hiểm không chỉ để tránh bị phạt mà còn để bảo vệ tính mạng của chính bản thân. Số liệu cho thấy 70% trường hợp tử vong trong tai nạn giao thông là do chấn thương vùng đầu."

**Lưu ý quan trọng:**

✅ Mũ bảo hiểm phải có tem chuẩn CR, đủ niên hạn sử dụng
✅ Phải cài quai đúng cách, chặt vừa phải
✅ Mũ trẻ em phải phù hợp với kích cỡ đầu
✅ Không sử dụng mũ đã bị va đập mạnh

Chiến dịch sẽ kéo dài đến hết tháng 3/2026 với mục tiêu nâng tỷ lệ đội mũ bảo hiểm đạt 98%.`,
    },
    {
      id: 7,
      title: "Giá xăng dầu tăng 500đ/lít từ chiều nay",
      source: "Bộ Công Thương",
      time: "2 ngày trước",
      image:
        "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&q=80",
      keywords: ["giá xăng", "nhiên liệu", "tăng giá"],
      author: "Võ Thị G",
      readTime: "4 phút đọc",
      content: `Bộ Công Thương và Bộ Tài chính vừa công bố điều chỉnh giá xăng dầu có hiệu lực từ 15h00 chiều nay (03/02/2026) theo kỳ điều hành thứ 3 của năm.

**Mức giá mới:**

⛽ **Xăng RON 95:** 24,500đ/lít (tăng 520đ)
⛽ **Xăng E5 RON 92:** 23,200đ/lít (tăng 480đ)
⛽ **Dầu diesel:** 21,800đ/lít (tăng 550đ)
⛽ **Dầu hỏa:** 20,500đ/lít (tăng 430đ)
⛽ **Dầu mazut:** 18,900đ/lít (tăng 380đ)

**Nguyên nhân tăng giá:**

Theo giải trình từ cơ quan quản lý:

1️⃣ **Giá dầu thế giới tăng:**
   - Giá dầu Brent tăng 4.2% lên 87 USD/thùng
   - Căng thẳng địa chính trị khu vực Trung Đông
   - OPEC+ duy trì chính sách cắt giảm sản lượng

2️⃣ **Tỷ giá USD/VND tăng:**
   - Đồng USD mạnh lên 1.8% so với kỳ trước
   - Tác động trực tiếp đến chi phí nhập khẩu

3️⃣ **Chi phí vận chuyển tăng:**
   - Cước phí vận tải biển tăng 15%
   - Chi phí bảo hiểm và logistics tăng

**Tác động đến người dân:**

💰 **Chi phí sinh hoạt:**
- Hộ gia đình trung bình sử dụng xe máy: tăng ~150,000đ/tháng
- Hộ có ô tô: tăng ~400,000đ/tháng

🚚 **Vận tải hàng hóa:**
- Giá cước taxi/Grab dự kiến tăng 3-5%
- Chi phí vận chuyển hàng hóa tăng 4%
- Giá một số mặt hàng thiết yếu có thể tăng nhẹ

**Biện pháp hỗ trợ:**

Chính phủ đã chỉ đạo:

✅ Sử dụng Quỹ bình ổn để giảm mức tăng
✅ Giảm thuế môi trường xuống mức sàn
✅ Kiểm soát chặt giá xăng dầu tại các đại lý
✅ Xử lý nghiêm việc găm hàng, tăng giá bất hợp lý

**Dự báo xu hướng:**

Chuyên gia kinh tế Nguyễn Trí Hiếu nhận định: "Với diễn biến hiện tại, giá xăng dầu có thể tiếp tục dao động trong 2-3 tháng tới. Người dân nên cân nhắc sử dụng phương tiện công cộng hoặc xe điện để tiết kiệm chi phí."

**Khuyến nghị:**

🚗 Hạn chế sử dụng xe cá nhân khi không cần thiết
🚌 Ưu tiên phương tiện công cộng
🔋 Cân nhắc chuyển sang xe điện nếu có điều kiện
⚡ Lái xe tiết kiệm nhiên liệu (giữ tốc độ ổn định, không tăng tốc đột ngột)`,
    },
    {
      id: 8,
      title: "Khánh thành cầu vượt An Phú giảm kẹt xe khu Đông Sài Gòn",
      source: "Sở GTVT",
      time: "3 ngày trước",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
      keywords: ["cầu vượt", "khánh thành", "an phú"],
      author: "Lý Văn H",
      readTime: "5 phút đọc",
      content: `Sáng nay, UBND TP.HCM đã tổ chức lễ khánh thành và thông xe cầu vượt An Phú - công trình trọng điểm giải quyết ùn tắc tại nút giao An Phú (TP Thủ Đức).

**Thông tin công trình:**

🏗️ **Quy mô:**
- Chiều dài: 486m
- Chiều rộng: 30m (6 làn xe)
- Tổng vốn đầu tư: 820 tỷ đồng
- Thời gian thi công: 18 tháng

🌉 **Kết nối:**
- Nhánh 1: Xa lộ Hà Nội - Nguyễn Văn Hưởng
- Nhánh 2: Xa lộ Hà Nội - Lương Định Của
- Nhánh 3: Mai Chí Thọ - Nguyễn Văn Hưởng

**Hiệu quả mang lại:**

📊 **Về giao thông:**

Trước khi có cầu vượt:
- Thời gian chờ đèn đỏ: 5-8 phút/lần
- Tốc độ trung bình: 15km/h
- Ùn tắc kéo dài 1-2km vào giờ cao điểm

Sau khi có cầu vượt:
- Xe lưu thông liên tục, không chờ đèn
- Tốc độ trung bình: 50-60km/h
- Giảm 80% tình trạng ùn tắc

🌱 **Về môi trường:**
- Giảm 60% lượng khí thải CO2
- Tiếng ồn giảm 40%
- Chất lượng không khí cải thiện đáng kể

**Phản hồi từ người dân:**

Anh Nguyễn Văn Toàn (40 tuổi) - người thường xuyên di chuyển qua khu vực chia sẻ: "Trước đây mỗi sáng tôi mất 30 phút chỉ để qua nút giao này. Giờ có cầu vượt, 3 phút là xong. Thật sự rất tiện lợi!"

Chị Mai Hương (35 tuổi) - chủ quán cà phê gần đó: "Từ khi cầu vượt hoạt động, quán tôi đông khách hơn vì mọi người không còn sợ kẹt xe nữa."

**Tính năng thông minh:**

Cầu vượt được trang bị:

📱 Hệ thống camera giám sát 24/7
🚨 Cảm biến phát hiện sự cố tự động
💡 Đèn LED chiếu sáng tiết kiệm năng lượng
📡 Hệ thống thông tin giao thông thời gian thực

**Kế hoạch tiếp theo:**

Sau thành công của cầu vượt An Phú, UBND TP.HCM sẽ:

✅ Triển khai cầu vượt Gò Dưa (khởi công tháng 4/2026)
✅ Xây dựng cầu vượt Thảo Điền (khởi công tháng 7/2026)
✅ Cải tạo nút giao Hàng Xanh (bắt đầu nghiên cứu)

**Lời kêu gọi:**

Để công trình phát huy tối đa hiệu quả, Sở GTVT kêu gọi người dân:
- Tuân thủ biển báo, tốc độ quy định
- Không dừng đỗ xe trên cầu vượt
- Báo ngay cho cơ quan chức năng nếu phát hiện hư hỏng

Cầu vượt An Phú là một trong 15 công trình trọng điểm của TP.HCM trong giai đoạn 2024-2028, nhằm xây dựng hệ thống giao thông hiện đại, văn minh.`,
    },
  ];

  // Keywords có sẵn để filter
  const availableKeywords = [
    "tai nạn",
    "ùn tắc",
    "cấm đường",
    "thi công",
    "cao tốc",
    "cầu đường",
    "metro",
    "csgt",
    "xử phạt",
    "chính sách",
    "giá xăng",
    "brt",
    "lễ hội",
    "khánh thành",
    "mũ bảo hiểm",
  ];

  const latestNews = allNewsArticles.slice(0, 4);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    );
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const clearAllKeywords = () => {
    setSelectedKeywords([]);
  };

  const applyFilter = () => {
    setFilterModalVisible(false);
  };

  const handleArticlePress = (article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentScreen("newsDetail");
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const getFilteredNews = (): NewsArticle[] => {
    let filtered = allNewsArticles;

    // Filter by search text
    if (searchText.trim()) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filter by keywords
    if (selectedKeywords.length > 0) {
      filtered = filtered.filter((article) =>
        article.keywords?.some((keyword) => selectedKeywords.includes(keyword)),
      );
    }

    return filtered;
  };

  // ==================== RENDER NEWS DETAIL SCREEN ====================
  const renderNewsDetailScreen = () => {
    if (!selectedArticle) return null;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setCurrentScreen("allNews");
                setSelectedArticle(null);
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
            <View style={styles.iconButton} />
          </View>

          {/* Article Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Featured Image */}
            <Image
              source={{ uri: selectedArticle.image }}
              style={styles.detailImage}
              resizeMode="cover"
            />

            {/* Article Header */}
            <View style={styles.detailHeader}>
              {/* Category Badge */}
              {selectedArticle.category && (
                <View style={styles.detailCategoryBadge}>
                  <Text style={styles.detailCategoryText}>
                    {selectedArticle.category.toUpperCase()}
                  </Text>
                </View>
              )}

              {/* Title */}
              <Text style={styles.detailTitle}>{selectedArticle.title}</Text>

              {/* Metadata */}
              <View style={styles.detailMetadata}>
                <View style={styles.detailMetadataRow}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={16}
                    color="#137fec"
                  />
                  <Text style={styles.detailAuthor}>
                    {selectedArticle.author || "Tác giả ẩn danh"}
                  </Text>
                </View>
                <Text style={styles.detailMetadataDot}>•</Text>
                <View style={styles.detailMetadataRow}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color="#999999"
                  />
                  <Text style={styles.detailTime}>{selectedArticle.time}</Text>
                </View>
                <Text style={styles.detailMetadataDot}>•</Text>
                <View style={styles.detailMetadataRow}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={16}
                    color="#999999"
                  />
                  <Text style={styles.detailReadTime}>
                    {selectedArticle.readTime || "5 phút đọc"}
                  </Text>
                </View>
              </View>

              {/* Source */}
              <View style={styles.detailSource}>
                <Text style={styles.detailSourceLabel}>Nguồn: </Text>
                <Text style={styles.detailSourceText}>
                  {selectedArticle.source}
                </Text>
              </View>

              {/* Keywords */}
              {selectedArticle.keywords &&
                selectedArticle.keywords.length > 0 && (
                  <View style={styles.detailKeywords}>
                    {selectedArticle.keywords.map((keyword, index) => (
                      <View key={index} style={styles.detailKeywordChip}>
                        <Text style={styles.detailKeywordText}>#{keyword}</Text>
                      </View>
                    ))}
                  </View>
                )}
            </View>

            {/* Divider */}
            <View style={styles.detailDivider} />

            {/* Article Content */}
            <View style={styles.detailContent}>
              <Text style={styles.detailContentText}>
                {selectedArticle.content || "Nội dung đang được cập nhật..."}
              </Text>
            </View>

            {/* Related News Section */}
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>Tin tức liên quan</Text>
              <View style={styles.relatedList}>
                {allNewsArticles
                  .filter((article) => article.id !== selectedArticle.id)
                  .slice(0, 3)
                  .map((article) => (
                    <TouchableOpacity
                      key={article.id}
                      style={styles.relatedCard}
                      onPress={() => handleArticlePress(article)}
                    >
                      <Image
                        source={{ uri: article.image }}
                        style={styles.relatedImage}
                        resizeMode="cover"
                      />
                      <View style={styles.relatedContent}>
                        <Text style={styles.relatedCardTitle} numberOfLines={2}>
                          {article.title}
                        </Text>
                        <Text style={styles.relatedTime}>{article.time}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
        <MainTab />
      </View>
    );
  };

  // ==================== RENDER NOTIFICATIONS SCREEN ====================
  const renderNotificationsScreen = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setCurrentScreen("main")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Thông báo</Text>
            <TouchableOpacity style={styles.iconButton} onPress={markAllAsRead}>
              <Text style={styles.markAllReadText}>Đọc tất cả</Text>
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>
                  {unreadCount} thông báo chưa đọc
                </Text>
              </View>
            )}

            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.isRead && styles.notificationCardUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View
                  style={[
                    styles.notificationIcon,
                    notification.type === "warning" &&
                      styles.notificationIconWarning,
                    notification.type === "alert" &&
                      styles.notificationIconAlert,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={
                      notification.type === "warning"
                        ? "alert"
                        : notification.type === "alert"
                          ? "alert-circle"
                          : "information"
                    }
                    size={24}
                    color={
                      notification.type === "warning"
                        ? "#ff9500"
                        : notification.type === "alert"
                          ? "#ff3b30"
                          : "#137fec"
                    }
                  />
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    {!notification.isRead && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
        <MainTab />
      </View>
    );
  };

  // ==================== RENDER ALL NEWS SCREEN ====================
  const renderAllNewsScreen = () => {
    const filteredNews = getFilteredNews();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <SafeAreaView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setCurrentScreen("main");
                setSearchText("");
                setSelectedKeywords([]);
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tất cả tin tức</Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="filter-variant"
                size={28}
                color="#ffffff"
              />
              {selectedKeywords.length > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>
                    {selectedKeywords.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#137fec"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm tin tức..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color="rgba(255,255,255,0.4)"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Selected Keywords */}
          {selectedKeywords.length > 0 && (
            <View style={styles.selectedKeywordsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.selectedKeywordsContent}
              >
                {selectedKeywords.map((keyword) => (
                  <View key={keyword} style={styles.selectedKeywordChip}>
                    <Text style={styles.selectedKeywordText}>{keyword}</Text>
                    <TouchableOpacity onPress={() => removeKeyword(keyword)}>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={16}
                        color="#000000"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.clearKeywordsButton}
                  onPress={clearAllKeywords}
                >
                  <Text style={styles.clearKeywordsText}>Xóa tất cả</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* News List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.allNewsSection}>
              <Text style={styles.resultCount}>
                {filteredNews.length} tin tức
              </Text>

              {filteredNews.length > 0 ? (
                <View style={styles.newsList}>
                  {filteredNews.map((article) => (
                    <TouchableOpacity
                      key={article.id}
                      style={styles.newsCard}
                      activeOpacity={0.7}
                      onPress={() => handleArticlePress(article)}
                    >
                      <Image
                        source={{ uri: article.image }}
                        style={styles.newsImage}
                        resizeMode="cover"
                      />
                      <View style={styles.newsContent}>
                        <Text style={styles.newsTitle} numberOfLines={2}>
                          {article.title}
                        </Text>
                        <View style={styles.newsMetadata}>
                          <Text style={styles.newsSource}>
                            {article.source.toUpperCase()}
                          </Text>
                          <Text style={styles.metadataDot}>•</Text>
                          <Text style={styles.newsTime}>{article.time}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons
                    name="newspaper-variant-outline"
                    size={64}
                    color="rgba(255,255,255,0.2)"
                  />
                  <Text style={styles.emptyText}>
                    Không tìm thấy tin tức nào
                  </Text>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      setSearchText("");
                      clearAllKeywords();
                    }}
                  >
                    <Text style={styles.resetButtonText}>Đặt lại bộ lọc</Text>
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
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Lọc theo từ khóa</Text>
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

              {/* Selected Keywords in Modal */}
              {selectedKeywords.length > 0 && (
                <View style={styles.modalSelectedSection}>
                  <View style={styles.modalSelectedHeader}>
                    <Text style={styles.modalSelectedTitle}>
                      Đã chọn ({selectedKeywords.length})
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.modalSelectedList}
                  >
                    {selectedKeywords.map((keyword) => (
                      <View key={keyword} style={styles.modalSelectedChip}>
                        <Text style={styles.modalSelectedText}>{keyword}</Text>
                        <TouchableOpacity
                          onPress={() => removeKeyword(keyword)}
                        >
                          <MaterialCommunityIcons
                            name="close-circle"
                            size={18}
                            color="#000000"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Keywords Grid */}
              <ScrollView
                style={styles.keywordsScroll}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.keywordsSectionTitle}>
                  Chọn từ khóa để lọc
                </Text>
                <View style={styles.keywordsGrid}>
                  {availableKeywords.map((keyword) => {
                    const isSelected = selectedKeywords.includes(keyword);
                    return (
                      <TouchableOpacity
                        key={keyword}
                        style={[
                          styles.keywordChip,
                          isSelected && styles.keywordChipActive,
                        ]}
                        onPress={() => toggleKeyword(keyword)}
                      >
                        <Text
                          style={[
                            styles.keywordChipText,
                            isSelected && styles.keywordChipTextActive,
                          ]}
                        >
                          {keyword}
                        </Text>
                        {isSelected && (
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={18}
                            color="#137fec"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalResetButton}
                  onPress={clearAllKeywords}
                >
                  <Text style={styles.modalResetButtonText}>
                    Bỏ chọn tất cả
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalApplyButton}
                  onPress={applyFilter}
                >
                  <Text style={styles.modalApplyButtonText}>
                    Áp dụng{" "}
                    {selectedKeywords.length > 0
                      ? `(${selectedKeywords.length})`
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
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setSearchVisible(!searchVisible)}
            >
              <MaterialCommunityIcons
                name={searchVisible ? "close" : "magnify"}
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tin tức Giao thông</Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setCurrentScreen("notifications")}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={28}
                color="#ffffff"
              />
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notifications.filter((n) => !n.isRead).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar (Expandable) */}
          {searchVisible && (
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color="#137fec"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Tìm kiếm tin tức..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText("")}>
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={20}
                      color="rgba(255,255,255,0.4)"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Featured News Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tin nổi bật</Text>

              <TouchableOpacity
                style={styles.featuredCard}
                activeOpacity={0.9}
                onPress={() => handleArticlePress(allNewsArticles[0])}
              >
                <Image
                  source={{ uri: featuredNews.image }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={styles.featuredOverlay} />
                <View style={styles.featuredContent}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {featuredNews.category.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.featuredTitle}>{featuredNews.title}</Text>
                  <Text style={styles.featuredDescription}>
                    {featuredNews.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Latest News Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tin mới nhất</Text>
                <TouchableOpacity onPress={() => setCurrentScreen("allNews")}>
                  <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.newsList}>
                {latestNews.map((article) => (
                  <TouchableOpacity
                    key={article.id}
                    style={styles.newsCard}
                    activeOpacity={0.7}
                    onPress={() => handleArticlePress(article)}
                  >
                    <Image
                      source={{ uri: article.image }}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                    <View style={styles.newsContent}>
                      <Text style={styles.newsTitle} numberOfLines={2}>
                        {article.title}
                      </Text>
                      <View style={styles.newsMetadata}>
                        <Text style={styles.newsSource}>
                          {article.source.toUpperCase()}
                        </Text>
                        <Text style={styles.metadataDot}>•</Text>
                        <Text style={styles.newsTime}>{article.time}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bottom Spacing for MainTab */}
            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>

        {/* Bottom Navigation - MainTab Component */}
        <MainTab />
      </View>
    );
  };

  // ==================== MAIN RENDER ====================
  if (currentScreen === "notifications") {
    return renderNotificationsScreen();
  } else if (currentScreen === "allNews") {
    return renderAllNewsScreen();
  } else if (currentScreen === "newsDetail") {
    return renderNewsDetailScreen();
  }

  return renderMainScreen();
}

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
    paddingVertical: 16,
    paddingBottom: 12,
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  markAllReadText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#137fec",
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  notificationBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },
  filterBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#137fec",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  filterBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },
  // Search Bar Styles
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    height: 48,
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
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    paddingHorizontal: 16,
    marginBottom: 16,
    letterSpacing: -0.4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#137fec",
  },
  // Featured Card Styles
  featuredCard: {
    marginHorizontal: 16,
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  featuredContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: "#137fec",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 1.2,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  featuredDescription: {
    fontSize: 14,
    color: "#d1d1d1",
    lineHeight: 20,
  },
  // News List Styles
  newsList: {
    gap: 12,
    paddingHorizontal: 16,
  },
  newsCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  newsContent: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    lineHeight: 20,
  },
  newsMetadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  newsSource: {
    fontSize: 10,
    fontWeight: "700",
    color: "#137fec",
    letterSpacing: 0.5,
  },
  metadataDot: {
    fontSize: 10,
    color: "#666666",
  },
  newsTime: {
    fontSize: 11,
    color: "#999999",
  },
  // Notifications Screen Styles
  unreadBadge: {
    backgroundColor: "rgba(19,127,236,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(19,127,236,0.3)",
  },
  unreadBadgeText: {
    color: "#137fec",
    fontSize: 13,
    fontWeight: "600",
  },
  notificationCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#121212",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  notificationCardUnread: {
    backgroundColor: "rgba(19,127,236,0.05)",
    borderColor: "rgba(19,127,236,0.2)",
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(19,127,236,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIconWarning: {
    backgroundColor: "rgba(255,149,0,0.15)",
  },
  notificationIconAlert: {
    backgroundColor: "rgba(255,59,48,0.15)",
  },
  notificationContent: {
    flex: 1,
    gap: 6,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#137fec",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#d1d1d1",
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999999",
  },
  // All News Screen Styles
  allNewsSection: {
    marginTop: 16,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectedKeywordsContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  selectedKeywordsContent: {
    gap: 8,
    paddingRight: 16,
  },
  selectedKeywordChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#137fec",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  selectedKeywordText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  clearKeywordsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255,59,48,0.2)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ff3b30",
    justifyContent: "center",
  },
  clearKeywordsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff3b30",
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
  resetButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(19,127,236,0.15)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#137fec",
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#137fec",
  },
  // Filter Modal Styles
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
  modalSelectedSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  modalSelectedHeader: {
    marginBottom: 12,
  },
  modalSelectedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  modalSelectedList: {
    flexDirection: "row",
  },
  modalSelectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#137fec",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  modalSelectedText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  keywordsScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  keywordsSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 16,
  },
  keywordsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
  },
  keywordChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  keywordChipActive: {
    backgroundColor: "rgba(19,127,236,0.15)",
    borderColor: "#137fec",
  },
  keywordChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  keywordChipTextActive: {
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
  modalResetButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalResetButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  modalApplyButton: {
    flex: 1,
    backgroundColor: "#137fec",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalApplyButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },
  // News Detail Screen Styles
  detailImage: {
    width: "100%",
    height: 280,
    backgroundColor: "#1a1a1a",
  },
  detailHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  detailCategoryBadge: {
    backgroundColor: "#137fec",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  detailCategoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 1,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 34,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  detailMetadata: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  detailMetadataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailAuthor: {
    fontSize: 13,
    fontWeight: "600",
    color: "#137fec",
  },
  detailTime: {
    fontSize: 13,
    color: "#999999",
  },
  detailReadTime: {
    fontSize: 13,
    color: "#999999",
  },
  detailMetadataDot: {
    fontSize: 13,
    color: "#666666",
  },
  detailSource: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailSourceLabel: {
    fontSize: 13,
    color: "#999999",
  },
  detailSourceText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },
  detailKeywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detailKeywordChip: {
    backgroundColor: "rgba(19,127,236,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(19,127,236,0.3)",
  },
  detailKeywordText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#137fec",
  },
  detailDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 24,
    marginHorizontal: 16,
  },
  detailContent: {
    paddingHorizontal: 16,
  },
  detailContentText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#e0e0e0",
    letterSpacing: 0.2,
  },
  relatedSection: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },
  relatedList: {
    gap: 12,
  },
  relatedCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#121212",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  relatedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  relatedContent: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  relatedCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    lineHeight: 19,
  },
  relatedTime: {
    fontSize: 12,
    color: "#999999",
  },
});
