import SubPageLayout from "@/components/SubPageLayout";

const PrivacyPolicyPage = () => (
  <SubPageLayout title="นโยบายความเป็นส่วนตัว">
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 text-sm text-foreground leading-relaxed">
      <h2 className="font-heading font-semibold text-base">นโยบายความเป็นส่วนตัว Kinabetes</h2>
      <p className="text-muted-foreground text-xs">อัปเดตล่าสุด: 1 มีนาคม 2569</p>

      <section>
        <h3 className="font-semibold mb-1">1. ข้อมูลที่เราเก็บรวบรวม</h3>
        <p>เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ เช่น ชื่อ-นามสกุล อีเมล หมายเลขโทรศัพท์ และข้อมูลสุขภาพที่เกี่ยวข้องกับการตรวจปัสสาวะ รวมถึงผลการวิเคราะห์จาก AI</p>
      </section>

      <section>
        <h3 className="font-semibold mb-1">2. วัตถุประสงค์ในการใช้ข้อมูล</h3>
        <p>ข้อมูลของคุณจะถูกใช้เพื่อ:</p>
        <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
          <li>ให้บริการวิเคราะห์ผลตรวจสุขภาพไต</li>
          <li>เชื่อมต่อคุณกับเภสัชกรสำหรับคำปรึกษา</li>
          <li>ส่งการแจ้งเตือนเกี่ยวกับสุขภาพของคุณ</li>
          <li>ปรับปรุงบริการและระบบ AI ของเรา</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-1">3. การแชร์ข้อมูล</h3>
        <p>เราจะไม่แชร์ข้อมูลสุขภาพของคุณกับบุคคลที่สาม ยกเว้นเภสัชกรที่คุณอนุญาตให้เข้าถึงข้อมูลผ่านการตั้งค่าในแอปพลิเคชัน</p>
      </section>

      <section>
        <h3 className="font-semibold mb-1">4. การรักษาความปลอดภัย</h3>
        <p>ข้อมูลทั้งหมดได้รับการเข้ารหัสด้วย AES-256 และจัดเก็บในเซิร์ฟเวอร์ที่ผ่านมาตรฐาน ISO 27001 เราใช้มาตรการรักษาความปลอดภัยขั้นสูงเพื่อปกป้องข้อมูลของคุณ</p>
      </section>

      <section>
        <h3 className="font-semibold mb-1">5. สิทธิ์ของคุณ</h3>
        <p>คุณมีสิทธิ์ในการเข้าถึง แก้ไข ลบ หรือย้ายข้อมูลส่วนบุคคลของคุณได้ตลอดเวลา โดยติดต่อเราผ่านการตั้งค่าในแอปหรืออีเมล support@kinabetes.com</p>
      </section>

      <section>
        <h3 className="font-semibold mb-1">6. การติดต่อ</h3>
        <p>หากมีคำถามเกี่ยวกับนโยบายนี้ กรุณาติดต่อ: support@kinabetes.com</p>
      </section>
    </div>
  </SubPageLayout>
);

export default PrivacyPolicyPage;
