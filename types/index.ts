export type Status = "active" | "inactive" | "pending" | "cancelled";

export type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: Status;
  date: string;
};
