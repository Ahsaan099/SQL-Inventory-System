import { useState, useRef } from "react";
import {
  Package,
  Plus,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Search,
  Zap,
  Eye,
} from "lucide-react";

import CursorGlow from "./components/CursorGlow";
import StatCard from "./components/StatCard";
import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import SqlModal from "./components/SqlModal";

import {
  INITIAL_PRODUCTS,
  SQL_QUERIES,
  getStatus,
} from "./data/products";

const EMPTY_FORM = {
  name: "",
  category: "Electronics",
  quantity: "",
  price: "",
  sku: "",
};

function validate(form) {
  const e = {};

  if (!form.name.trim()) e.name = "Name required";

  if (
    form.quantity === "" ||
    isNaN(form.quantity) ||
    Number(form.quantity) < 0
  ) {
    e.quantity = "Valid qty required";
  }

  if (
    form.price === "" ||
    isNaN(form.price) ||
    Number(form.price) <= 0
  ) {
    e.price = "Valid price required";
  }

  if (!form.sku.trim()) e.sku = "SKU required";

  return e;
}

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sqlModal, setSqlModal] = useState(null);
  const [animNew, setAnimNew] = useState(null);

  const nextId = useRef(100);


  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditId(p.id);

    setForm({
      name: p.name,
      category: p.category,
      quantity: String(p.quantity),
      price: String(p.price),
      sku: p.sku,
    });

    setErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    const e = validate(form);

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const payload = {
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      price: Number(form.price),
      sku: form.sku.toUpperCase(),
    };

    if (editId) {
      const updated = {
        ...payload,
        id: editId,
      };

      setProducts((ps) =>
        ps.map((p) => (p.id === editId ? updated : p))
      );

      setSqlModal({
        query: SQL_QUERIES.update(updated),
        action: "UPDATE",
      });
    } else {
      const newP = {
        ...payload,
        id: nextId.current++,
      };

      setProducts((ps) => [...ps, newP]);

      setAnimNew(newP.id);

      setTimeout(() => {
        setAnimNew(null);
      }, 800);

      setSqlModal({
        query: SQL_QUERIES.add(newP),
        action: "INSERT",
      });
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setSqlModal({
      query: SQL_QUERIES.delete(id),
      action: "DELETE",
    });

    setProducts((ps) => ps.filter((p) => p.id !== id));
  };

  const handleQtyChange = (id, delta) => {
    setProducts((ps) =>
      ps.map((p) =>
        p.id !== id
          ? p
          : {
              ...p,
              quantity: Math.max(0, p.quantity + delta),
            }
      )
    );
  };


  const filtered = products.filter((p) => {
    const s = search.toLowerCase();

    const matchSearch =
      p.name.toLowerCase().includes(s) ||
      p.sku.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s);

    const status = getStatus(p.quantity);

    const matchFilter =
      filterStatus === "all" || filterStatus === status;

    return matchSearch && matchFilter;
  });

  const totalValue = products.reduce(
    (s, p) => s + p.price * p.quantity,
    0
  );

  const outOfStock = products.filter(
    (p) => p.quantity === 0
  ).length;

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity < 10
  ).length;


  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "#ffffff",
        color: "#000",
      }}
    >
      <CursorGlow />


      <header
        style={{
          borderBottom: "1px solid #e5e5e5",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 100,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              background: "#000",
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Package size={22} color="white" />
          </div>

          <div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#000",
              }}
            >
              InvenTrack Pro
            </h1>

            <p
              style={{
                color: "#666",
                fontSize: 12,
              }}
            >
              Inventory Management System
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >

          <button
            onClick={() =>
              setSqlModal({
                query: SQL_QUERIES.select(),
                action: "SELECT",
              })
            }
            style={{
              background: "#fff",
              border: "1px solid #000",
              borderRadius: 10,
              color: "#000",
              padding: "9px 18px",
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            <Eye size={14} />
            View SQL Query
          </button>


          <button
            onClick={openAdd}
            style={{
              background: "#000",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              padding: "9px 18px",
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            <Plus size={15} />
            Add Product
          </button>
        </div>
      </header>


      <main
        style={{
          padding: "28px 32px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >

        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <StatCard
            icon={Package}
            label="Total Products"
            value={products.length}
            color="#000"
            sub="SKUs tracked"
          />

          <StatCard
            icon={BarChart3}
            label="Total Value"
            value={`₨${(totalValue / 1000).toFixed(0)}K`}
            color="#000"
            sub="Inventory worth"
          />

          <StatCard
            icon={AlertTriangle}
            label="Out of Stock"
            value={outOfStock}
            color="#000"
            sub={`${outOfStock} items`}
          />

          <StatCard
            icon={TrendingDown}
            label="Low Stock"
            value={lowStock}
            color="#000"
            sub="Below 10 units"
          />
        </div>


        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >

          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >

            <div
              style={{
                position: "relative",
                flex: 1,
                minWidth: 200,
              }}
            >
              <Search
                size={15}
                color="#555"
                style={{
                  position: "absolute",
                  left: 13,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, SKU, category..."
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 40px",
                  borderRadius: 10,
                  border: "1px solid #d4d4d4",
                  background: "#fff",
                  color: "#000",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>


            <div
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              {[
                ["all", "All"],
                ["ok", "In Stock"],
                ["low", "Low"],
                ["out", "Out"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setFilterStatus(v)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border:
                      filterStatus === v
                        ? "1px solid #000"
                        : "1px solid #d4d4d4",
                    background:
                      filterStatus === v ? "#000" : "#fff",
                    color:
                      filterStatus === v ? "#fff" : "#000",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <span
              style={{
                color: "#666",
                fontSize: 13,
                marginLeft: "auto",
              }}
            >
              {filtered.length} of {products.length} items
            </span>
          </div>


          <ProductTable
            filtered={filtered}
            animNew={animNew}
            onEdit={openEdit}
            onDelete={handleDelete}
            onQtyChange={handleQtyChange}
            onSqlPreview={(p) =>
              setSqlModal({
                query: SQL_QUERIES.update(p),
                action: "UPDATE PREVIEW",
              })
            }
          />


          <div
            style={{
              padding: "14px 24px",
              borderTop: "1px solid #e5e5e5",
              display: "flex",
              justifyContent: "space-between",
              color: "#555",
              fontSize: 12,
            }}
          >
            <span>
              Total inventory value:{" "}
              <span
                style={{
                  color: "#000",
                  fontWeight: 600,
                }}
              >
                ₨{totalValue.toLocaleString()}
              </span>
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Zap size={12} color="#000" />
              Live — updates instantly
            </span>
          </div>
        </div>
      </main>


      {showModal && (
        <ProductFormModal
          editId={editId}
          form={form}
          setForm={setForm}
          errors={errors}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {sqlModal && (
        <SqlModal
          query={sqlModal.query}
          action={sqlModal.action}
          onClose={() => setSqlModal(null)}
        />
      )}
    </div>
  );
}
