import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import toast from "react-hot-toast";
import {
  fetchCustomers,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetail = ({ customerId, onBack }: CustomerDetailProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch customer data
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers);
        const found = customers.find((c) => c._id === customerId);
        if (found) setCustomer(found);
        else toast.error("Customer not found");
      } catch (error) {
        toast.error("Failed to fetch customer");
      } finally {
        setLoading(false);
      }
    };
    getCustomer();
  }, [customerId]);

  const handleUpdate = async () => {
    try {
      if (!customer) {
        toast.error("Customer data is missing");
        return;
      }
      const updated = await updateCustomer(customerId, {
        ...customer,
        name: customer.name + " (Updated)",
      });
      setCustomer(updated);
      toast.success("Customer updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCustomer(customerId);
      toast.success("Customer deleted");
      onBack(); // Go back to the list
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!customer) return <p>No customer found.</p>;

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Customer Detail</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>

      <div className="mt-4 flex gap-2">
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
        <Button onClick={onBack} className="bg-gray-400 hover:bg-gray-500">
          Back
        </Button>
      </div>
    </Card>
  );
};

export default CustomerDetail;
