"use client";

import { bookSeat, confirmSeat, getSeats } from "@/services/seatServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import socket from "../../socket/socket";

/* =========================
   Decode token helper
========================= */
const getLoggedInUser = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    return jwtDecode(token); // { email, gender, ... }
  } catch {
    return null;
  }
};

export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  /* =========================
     Logged-in user (from token)
  ========================= */
  const user = getLoggedInUser();
  console.log("user", user);

  const userEmail = user?.email || null;
  const userGender = user?.gender || null;

  /* =========================
     Fetch seats
  ========================= */
  const fetchSeats = async () => {
    try {
      const res = await getSeats();
      setSeats(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    socket.on("seatUpdated", () => {
      fetchSeats();
    });

    fetchSeats();

    return ()=> {
      socket.off("seatUpdated")
    }
  }, []);

  /* =========================
     STEP 1: Lock seat
  ========================= */
  const handleBookSeat = async (seat) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const isConfirm = window.confirm(
      `Are you sure you want to book ${seat.seatName}?`
    );
    if (!isConfirm) return;

    setBookingId(seat._id);

    try {
      const res = await bookSeat({ seatID: seat._id });
      toast.success(res.message || "Seat locked successfully!");

      setSelectedSeat(seat);

      setConfirmModalOpen(true);

      fetchSeats();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBookingId(null);
    }
  };

  /* =========================
     STEP 2: Confirm booking
  ========================= */
  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;

    setConfirmLoading(true);
    try {
      const res = await confirmSeat({ seatID: selectedSeat._id });
      toast.success(res.message || "Seat confirmed successfully!");

      setConfirmModalOpen(false);
      setSelectedSeat(null);
      fetchSeats();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  /* =========================
     Reopen confirm modal
  ========================= */
  const reopenConfirmModal = (seat) => {
    setSelectedSeat(seat);
    setConfirmModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading seats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Seats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seats.map((seat) => {
          const isLockedByMe =
            seat.status === "locked" && seat.lockedTime?.lockBy === userEmail;

          const isGenderMismatch =
            userGender && seat.seatGender && seat.seatGender !== userGender;

          return (
            <div
              key={seat._id}
              className={`p-5 rounded-xl shadow-md border
                ${
                  seat.status === "booked"
                    ? "bg-red-50 border-red-300"
                    : seat.status === "locked"
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-green-50 border-green-300"
                }`}
            >
              <h2 className="text-xl font-semibold mb-2">
                Seat #{seat.seatNum}
              </h2>

              <p>
                <b>Name:</b> {seat.seatName}
              </p>
              <p>
                <b>Gender:</b> {seat.seatGender}
              </p>
              <p className="mt-1">
                <b>Status:</b>{" "}
                <span className="font-semibold">{seat.status}</span>
              </p>

              {/* AVAILABLE */}
              {seat.status === "available" && (
                <button
                  onClick={() => handleBookSeat(seat)}
                  disabled={bookingId === seat._id || isGenderMismatch}
                  className={`mt-4 w-full py-2 rounded-lg text-white
                    ${
                      isGenderMismatch
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isGenderMismatch
                    ? "Not Allowed"
                    : bookingId === seat._id
                    ? "Booking..."
                    : "Book Seat"}
                </button>
              )}

              {/* LOCKED BY CURRENT USER */}
              {isLockedByMe && (
                <button
                  onClick={() => reopenConfirmModal(seat)}
                  className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
                >
                  Confirm Booking
                </button>
              )}

              {/* BOOKED */}
              {seat.status === "booked" && (
                <button
                  disabled
                  className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                >
                  Already Booked
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* CONFIRM MODAL */}
      {confirmModalOpen && selectedSeat && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">Confirm Booking</h2>

            <p className="mb-4">
              Seat <b>{selectedSeat.seatName}</b> is locked for you.
              <br />
              Please confirm within 2 minutes.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="w-1/2 bg-gray-300 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSeat}
                disabled={confirmLoading}
                className="w-1/2 bg-green-600 text-white py-2 rounded-lg"
              >
                {confirmLoading ? "Confirming..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
