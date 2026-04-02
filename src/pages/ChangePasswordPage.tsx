import SubPageLayout from "@/components/SubPageLayout";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirm) {
      toast.error("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    if (newPass.length < 8) {
      toast.error("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
    setCurrent("");
    setNewPass("");
    setConfirm("");
  };

  return (
    <SubPageLayout title="เปลี่ยนรหัสผ่าน">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">รหัสผ่านปัจจุบัน</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">รหัสผ่านใหม่</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">ยืนยันรหัสผ่านใหม่</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl mt-2"
        >
          บันทึกรหัสผ่านใหม่
        </button>
      </form>
    </SubPageLayout>
  );
};

export default ChangePasswordPage;
