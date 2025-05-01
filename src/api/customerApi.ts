const API = import.meta.env.VITE_API_URL;

export const fetchCustomers = async () => {
  try {
    const res = await fetch(`${API}/customers`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

export const createCustomer = async (data: any) => {
  try {
    const res = await fetch(`${API}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create customer");
    return res.json();
  } catch (err) {
    console.error("Create error:", err);
    throw err;
  }
};

export const updateCustomer = async (id: string, data: any) => {
  try {
    const res = await fetch(`${API}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    return res.json();
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const res = await fetch(`${API}/customers/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete customer");
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
};
