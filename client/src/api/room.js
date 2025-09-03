import axiosInstance from "@/utils/axiosInstance";
import { headers } from "@/utils/constants";

export const createRoom = async ({ formData, accessToken }) => {
  return await axiosInstance.post(
    "/rooms/create",
    formData,
    headers(accessToken)
  );
};

export const getRoomMeta = async (accessToken) => {
  return await axiosInstance.get("/rooms/meta", headers(accessToken));
};
export const getAllRooms = async (searchparams, accessToken) => {
  const page = Number(searchparams.get("page")) || 1;
  const Limit = Number(searchparams.get("limit")) | 10;
  const query = searchparams.get("query") || "";
  const roomtype = searchparams.get("roomType") || "";
  const roomStatus = searchparams.get("roomStatus") || "";
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", Limit);
  if (query) params.append("query", query);
  if (roomtype) params.append("roomType", roomtype);
  if (roomStatus) params.append("roomStatus", roomStatus);
  return await axiosInstance.get(
    `/rooms/all?${params.toString()}`,
    headers(accessToken)
  );
};

export const updateRoom = async ({ roomId, formData, accessToken }) => {
  return await axiosInstance.patch(
    `/rooms/${roomId}/update`,
    formData,
    headers(accessToken)
  );
};
