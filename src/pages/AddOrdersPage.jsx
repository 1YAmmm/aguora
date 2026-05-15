import { useState } from "react";
import { IconChevronLeft, IconPlus } from "../assets/icons";
import Modal from "../components/Modal";
import "../styles/add-orders.css";
import { IconBank, IconCard, IconMoney } from "../assets/icons";
export default function AddOrdersPage() {
  const [customer, setCustomer] = useState("");
  const [note, setNote] = useState("");

  const [showBrowseModal, setShowBrowseModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [discountAmount, setDiscountAmount] = useState("");
  const [discountNote, setDiscountNote] = useState("");

  const [shippingFee, setShippingFee] = useState("");
  const [shippingNote, setShippingNote] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [amountPaid, setAmountPaid] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentNote, setPaymentNote] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkDate, setCheckDate] = useState("");
  function openFormModal(type) {
    setModalType(type);
    setShowFormModal(true);
  }

  function handleSubmitModal() {
    if (modalType === "discount") {
      console.log({
        discountAmount,
        discountNote,
      });
    }

    if (modalType === "shipping") {
      console.log({
        shippingFee,
        shippingNote,
      });
    }

    if (modalType === "details") {
      console.log({
        receiverName,
        receiverPhone,
        receiverAddress,
      });
    }

    setShowFormModal(false);
  }

  return (
    <div className="add-order-page">
      {/* PRODUCT LIST MODAL */}
      <Modal
        open={showBrowseModal}
        onClose={() => setShowBrowseModal(false)}
        title="Product List"
        size="lg"
        footer={
          <div className="product-modal-footer">
            <button
              className="cancel-btn"
              onClick={() => setShowBrowseModal(false)}
            >
              Cancel
            </button>

            <button className="add-btn">Add</button>
          </div>
        }
      >
        <div className="product-modal-content">
          <div className="product-search">
            <input type="text" placeholder="Search Products" />
          </div>

          <div className="table-responsive">
            <table className="product-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Stock on hand</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>Sapphire Pulse RX 6600 Gaming 8GB</td>

                  <td>100</td>

                  <td>1,000.00</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>Corsair iCue Link QX140 RGB 140mm</td>

                  <td>50</td>

                  <td>2,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
      {/* LIST AMOUNT MODAL */}
      <Modal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={
          modalType === "discount"
            ? "Add Discount"
            : modalType === "shipping"
              ? "Add Shipping"
              : "Shipping Details"
        }
        size="sm"
        footer={
          <div className="discount-modal-footer">
            <button
              className="discount-cancel-btn"
              onClick={() => setShowFormModal(false)}
            >
              Cancel
            </button>

            <button className="discount-submit-btn" onClick={handleSubmitModal}>
              Submit
            </button>
          </div>
        }
      >
        <div className="discount-modal-content">
          {/* DISCOUNT */}

          {modalType === "discount" && (
            <>
              <div className="discount-form-group">
                <label>Amount</label>

                <input
                  type="number"
                  placeholder="0.00"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                />
              </div>

              <div className="discount-form-group">
                <label>Note</label>

                <textarea
                  rows="3"
                  placeholder="Note"
                  value={discountNote}
                  onChange={(e) => setDiscountNote(e.target.value)}
                />
              </div>
            </>
          )}

          {/* SHIPPING */}

          {modalType === "shipping" && (
            <>
              <div className="discount-form-group">
                <label>Shipping Fee</label>

                <input
                  type="number"
                  placeholder="0.00"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                />
              </div>

              <div className="discount-form-group">
                <label>Note</label>

                <textarea
                  rows="3"
                  placeholder="Shipping note"
                  value={shippingNote}
                  onChange={(e) => setShippingNote(e.target.value)}
                />
              </div>
            </>
          )}

          {/* SHIPPING DETAILS */}

          {modalType === "details" && (
            <>
              <div className="discount-form-group">
                <label>Shipping Fee</label>

                <input
                  type="number"
                  placeholder="0.00"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                />
              </div>

              <div className="discount-form-group">
                <label>Note</label>

                <textarea
                  rows="3"
                  placeholder="Shipping note"
                  value={shippingNote}
                  onChange={(e) => setShippingNote(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
      {/* PAYMENT MODAL */}
      <Modal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Add Payment"
        size="sm"
        footer={
          <div className="payment-modal-footer">
            <button
              className="payment-cancel-btn"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </button>

            <button className="payment-submit-btn">Submit</button>
          </div>
        }
      >
        <div className="payment-modal-content">
          {/* PAYMENT METHOD */}

          <div className="payment-methods">
            {/* CASH */}

            <button
              className={`payment-method-card ${
                paymentMethod === "cash" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <div className="payment-icon">
                <IconMoney />
              </div>

              <span>Cash</span>
            </button>

            {/* CHECK */}

            <button
              className={`payment-method-card ${
                paymentMethod === "check" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("check")}
            >
              <div className="payment-icon">
                {" "}
                <IconCard />
              </div>

              <span>Check</span>
            </button>

            {/* BANK TRANSFER */}

            <button
              className={`payment-method-card ${
                paymentMethod === "bank" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("bank")}
            >
              <div className="payment-icon">
                {" "}
                <IconBank />
              </div>

              <span>Bank Transfer</span>
            </button>
          </div>

          {/* COMMON FIELD */}

          <div className="payment-form-group">
            <label>Amount Paid</label>

            <input
              type="number"
              placeholder="0.00"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </div>

          {/* CASH */}

          {paymentMethod === "cash" && (
            <>
              <div className="payment-form-group">
                <label>Reference Number</label>

                <input
                  type="text"
                  placeholder="Reference Number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Note</label>

                <textarea
                  rows="3"
                  placeholder="Note"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                />
              </div>
            </>
          )}
          {/* CHECK */}
          {paymentMethod === "check" && (
            <>
              <div className="payment-form-group">
                <label>Bank Name</label>

                <input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Bank Account Number</label>

                <input
                  type="text"
                  placeholder="Bank Account Number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Check Number</label>

                <input
                  type="text"
                  placeholder="Check Number"
                  value={checkNumber}
                  onChange={(e) => setCheckNumber(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Check Date</label>

                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={checkDate}
                  onChange={(e) => setCheckDate(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Proof of Payment</label>

                <input type="file" />
              </div>
            </>
          )}

          {/* BANK TRANSFER */}

          {paymentMethod === "bank" && (
            <>
              <div className="payment-form-group">
                <label>Bank Name</label>

                <input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Reference Number</label>

                <input
                  type="text"
                  placeholder="Reference Number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>

              <div className="payment-form-group">
                <label>Proof of Payment</label>

                <input type="file" />
              </div>
            </>
          )}
        </div>
      </Modal>
      {/* HEADER */}
      <div className="add-order-header">
        <div className="header-left">
          <button className="back-btn">
            <IconChevronLeft size={18} />
          </button>

          <h1>Create Order</h1>
        </div>

        <div className="header-actions">
          <button className="draft-btn">Save as draft</button>

          <button className="submit-btn">Submit</button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="add-order-content">
        {/* LEFT */}

        <div className="products-section">
          <div className="products-header">
            <span>Add Products</span>

            <button
              className="browse-btn"
              onClick={() => setShowBrowseModal(true)}
            >
              Browse
            </button>
          </div>

          <div className="products-body">
            <p>No products added.</p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="sidebar-section">
          {/* PAYMENT */}

          <div className="card">
            <h3>Payment</h3>

            <div className="payment-row">
              <span>Subtotal</span>
              <span>0.00</span>
            </div>

            <p className="items-text">0 Items</p>

            <button
              className="link-btn"
              onClick={() => openFormModal("discount")}
            >
              Add Discount
            </button>

            <button
              className="link-btn"
              onClick={() => openFormModal("shipping")}
            >
              Add Shipping
            </button>

            <button
              className="link-btn"
              onClick={() => openFormModal("details")}
            >
              Shipping Details
            </button>

            <div className="payment-total">
              <span>Total</span>
              <span>0.00</span>
            </div>

            <button
              className="payment-btn"
              onClick={() => setShowPaymentModal(true)}
            >
              <IconPlus size={13} />
              Add Payment
            </button>
          </div>

          {/* CUSTOMER */}

          <div className="card">
            <h3>Customer Information</h3>

            <div className="form-group">
              <label>Customer</label>

              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              >
                <option value="">Search or customer a client</option>

                <option>Juan Dela Cruz</option>
                <option>Maria Santos</option>
                <option>Pedro Reyes</option>
              </select>
            </div>
          </div>

          {/* ORDER INFO */}

          <div className="card">
            <h3>Order Information</h3>

            <div className="form-group">
              <label>Order Date</label>

              <input type="text" value="03/11/2026" readOnly />
            </div>

            <div className="form-group">
              <label>Order Number</label>

              <input type="text" value="0000011" readOnly />
            </div>

            <div className="form-group">
              <label>Terms (Days)</label>

              <input type="number" placeholder="0" />
            </div>

            <div className="form-group">
              <label>Due Date</label>

              <input type="text" placeholder="MM/DD/YYYY" />
            </div>

            <div className="form-group">
              <label>Note</label>

              <textarea
                rows="4"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
