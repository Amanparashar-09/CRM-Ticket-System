import React, { useEffect, useState } from "react";
import {
  fetchCustomers,
  createCustomer,
  deleteCustomer,
} from "../api/customerApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import toast from "react-hot-toast";

interface CustomerListProps {
  onSelectCustomer: (id: string) => void;
}

const CustomerList = ({ onSelectCustomer }: CustomerListProps) => {
  const [customers, setCustomers] = useState<{ _id: string; name: string; email: string; phone: string; address: string }[]>([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers().then(setCustomers).catch(() => {
      toast.error("Failed to fetch customers");
    });
  }, []);

  const handleAdd = async () => {
    try {
      const added = await createCustomer(newCustomer);
      setCustomers([...customers, added]);
      setNewCustomer({ name: "", email: "", phone: "", address: "" });
      toast.success("Customer added");
    } catch (err) {
      toast.error("Failed to add customer");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c._id !== id));
      toast.success("Customer deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>

      <ul className="mb-6">
        {customers.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center mb-2 cursor-pointer"
          >
            <span onClick={() => onSelectCustomer(c._id)}>{c.name}</span>
            <Button onClick={() => handleDelete(c._id)} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Add Customer</h3>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Name"
        value={newCustomer.name}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, name: e.target.value })
        }
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Email"
        value={newCustomer.email}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, email: e.target.value })
        }
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Phone"
        value={newCustomer.phone}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, phone: e.target.value })
        }
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Address"
        value={newCustomer.address}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, address: e.target.value })
        }
      />
      <Button onClick={handleAdd}>Add Customer</Button>
    </Card>
  );
};

export default CustomerList;
