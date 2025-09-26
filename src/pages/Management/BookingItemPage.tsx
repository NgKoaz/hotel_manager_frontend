// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Edit2, Save, X } from "lucide-react";
// import { BookingItem } from "@/types/BookingItem";
// import { bookingItemApi } from "@/api/booking-item.api";
// import { formatPrice } from "@/utils/formater.util";
// import { BookingItemTypeEnum } from "@/enums/BookingItemType.enum";
// import { Booking } from "@/types/Booking";
// import { bookingApi } from "@/api/booking.api";
// import { roomApi, GetBatchRoomResponse } from "@/api/room.api";
// import { toast } from "sonner";

// const BookingItemPage: React.FC = () => {
//   const [roomApiRes, setRoomApiRes] = useState<GetBatchRoomResponse>();
//   const [booking, setBooking] = useState<Booking>(null);
//   const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);

//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editValues, setEditValues] = useState<Partial<BookingItem>>({});

//   const [bookingId, setBookingId] = useState<number>(0);
//   const [selectedType, setSelectedType] = useState<BookingItemTypeEnum>(
//     BookingItemTypeEnum.Room
//   );
//   const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
//   const [unitPrice, setUnitPrice] = useState<number>(0);
//   const [quantity, setQuantity] = useState<number>(1);

//   useEffect(() => {
//     roomApi.getAll()
//       .then(setRoomApiRes)
//       .catch(console.log);

//   }, []);

//   useEffect(() => {
//     if (!bookingId) return;

//     const handler: NodeJS.Timeout = setTimeout(() => {
//       bookingApi.getById(bookingId)
//         .then(setBooking)
//         .catch((err) => {
//           console.log(err);
//           setBooking(null);
//         });

//       bookingItemApi.getByBooking(bookingId)
//         .then(setBookingItems)
//         .catch(err => {
//           console.log(err);
//           setBookingItems([]);
//         })
      
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [bookingId]);

//   if (!roomApiRes) return;
 
//   const handleAdd = async () => {
//     if (!selectedItemId || quantity <= 0) return;
//     try {
//       if (selectedType === BookingItemTypeEnum.Room && quantity > 1) {
//         toast.error("Số lượng phòng không được vượt quá 1.");
//         return;
//       } 
//       const newItem = await bookingItemApi.create({
//         bookingId,
//         roomId: selectedType === BookingItemTypeEnum.Room ? selectedItemId : 0,
//         itemTypeId: selectedType,
//         itemId: selectedItemId,
//         unitPrice,
//         quantity
//       });
//       setBookingItems((prev) => [...prev, newItem]);
//       setSelectedItemId(null);
//       setUnitPrice(0);
//       setQuantity(1);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (item: BookingItem) => {
//     try {
//       await bookingItemApi.remove(item.bookingId, item.roomId);
//       setBookingItems((prev) =>
//         prev.filter(
//           (i) => !(i.bookingId === item.bookingId && i.roomId === item.roomId)
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (item: BookingItem) => {
//     const key = `${item.bookingId}-${item.itemId}-${item.itemTypeId}`;
//     setEditingId(key);
//     setEditValues((prev) => ({
//       ...prev,
//       [key]: { ...item }
//     }));
//   };

//   const handleSave = async (key: string) => {
//     const values = editValues[key];
//     if (!values?.bookingId || !values?.roomId) return;
  
//     try {
//       const updated = await bookingItemApi.update(
//         values.bookingId,
//         values.roomId,
//         values
//       );
//       setBookingItems((prev) =>
//         prev.map((i) =>
//           i.bookingId === updated.bookingId && i.roomId === updated.roomId
//             ? updated
//             : i
//         )
//       );
//       setEditingId(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const itemOptions =
//     selectedType === BookingItemTypeEnum.Room
//       ? availableRooms.map((r) => ({ id: r.id, label: `Room ${r.roomNumber}` }))
//       : selectedType === BookingItemTypeEnum.Addon
//       ? availableAddons.map((a) => ({ id: a.id, label: a.name }))
//       : availableFineFees.map((f) => ({ id: f.id, label: f.name }));

//   console.log(bookingId, booking);

//   return (
//     <Card className="mb-6">
//       <CardHeader className="flex items-center space-x-2">
//         <CardTitle>Booking Items</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {/* Thêm mới item */}
//         <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end mb-4">
//           <div>
//             <Label>Booking ID</Label>
//             <Input
//               type="number"
//               value={bookingId}
//               onChange={(e) => setBookingId(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <Label>Item Type</Label>
//             <select
//               value={selectedType}
//               onChange={(e) => {
//                 const selectedType = Number(e.target.value) as BookingItemTypeEnum
//                 setSelectedType(selectedType)
//                 if (selectedType == BookingItemTypeEnum.Room) {
//                   const roomTypeId = roomApiRes.rooms.find(r => r.id == selectedItemId).roomTypeId;
//                   const roomType = roomApiRes.roomTypes.find(rt => rt.id == roomTypeId);
//                   setUnitPrice(roomType.basePrice);
//                 } else {
//                   const addon = roomApiRes.addons.find(a => a.id == selectedItemId);
//                   setUnitPrice(addon.basePrice);
//                 }
//                 }
//               }
//               className="border rounded p-1"
//             >
//               <option value={BookingItemTypeEnum.Room}>Room</option>
//               <option value={BookingItemTypeEnum.Addon}>Addon</option>
//             </select>
//           </div>
//           <div>
//             <Label>Item</Label>
//             <select
//               value={selectedItemId ?? ""}
//               onChange={(e) => {
//                 const selectedItemId = Number(e.target.value);
//                 setSelectedItemId(selectedItemId);
//                 if (selectedType == BookingItemTypeEnum.Room) {
//                   const roomTypeId = roomApiRes.rooms.find(r => r.id == selectedItemId).roomTypeId;
//                   const roomType = roomApiRes.roomTypes.find(rt => rt.id == roomTypeId);
//                   setUnitPrice(roomType.basePrice);
//                 } else {
//                   const addon = roomApiRes.addons.find(a => a.id == selectedItemId);
//                   setUnitPrice(addon.basePrice);
//                 }
//               }}
//               className="border rounded p-1"
//             >
//               <option value="">Chọn item</option>
//               {selectedType == BookingItemTypeEnum.Room &&
//                 roomApiRes.rooms.map(r => {
//                   const roomType = roomApiRes.roomTypes.find(rt => rt.id == r.roomTypeId);
//                   return (
//                     <option key={r.id} value={r.id}>
//                       {roomType.name} (#{r.roomNumber})
//                     </option>
//                   )
//                 })
//               }
//               {selectedType == BookingItemTypeEnum.Addon && 
//                 roomApiRes.addons.map(a => {
//                   return (
//                     <option key={a.id} value={a.id}>
//                       {a.name}
//                     </option>
//                   )
//                 })
//               }
//             </select>
//           </div>
//           <div>
//             <Label>Unit Price</Label>
//             <Input
//               type="number"
//               value={unitPrice}
//               onChange={(e) => setUnitPrice(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <Label>Quantity</Label>
//             <Input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <Button onClick={handleAdd} className="h-10 col-span-full sm:col-span-1">
//             Add Item
//           </Button>
//         </div>

//         {/* Danh sách item */}
//         <div className="space-y-2">
//           {bookingItems.length === 0 && (
//             <p className="text-sm text-gray-500">Không có items nào</p>
//           )}

//           {bookingItems.map((item) => {
//             const key = `${item.bookingId}-${item.itemId}-${item.itemTypeId}`;
//             const isEditing = editingId === key;

//             return (
//               <div
//                 key={key}
//                 className="flex justify-between items-center border rounded-md px-3 py-2 gap-4"
//               >
//                 <div className="flex-1">
//                   {isEditing ? (
//                     <div className="flex gap-2">
//                       <Input
//                         type="number"
//                         className="w-28"
//                         value={editValues.unitPrice ?? 0}
//                         onChange={(e) =>
//                           setEditValues((prev) => ({
//                             ...prev,
//                             [key]: {
//                               ...prev[key],
//                               unitPrice: Number(e.target.value)
//                             }
//                           }))
//                         }
//                       />
//                       <Input
//                         type="number"
//                         className="w-20"
//                         value={editValues.quantity ?? 1}
//                         onChange={(e) =>
//                           setEditValues((prev) => ({
//                             ...prev,
//                             [key]: {
//                               ...prev[key],
//                               quantity: Number(e.target.value),
//                             }
//                           }))
//                         }
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap gap-x-4 text-sm">
//                       <span className="font-medium">
//                         Booking ID: {item.bookingId}
//                       </span>
//                       <span>
//                         {BookingItemTypeEnum[item.itemTypeId]} ID: {item.itemId}
//                       </span>
//                       <span>
//                         {item.itemTypeId == BookingItemTypeEnum.Addon &&
//                           `${roomApiRes.addons.find(a => a.id == item.itemId).name}`
//                         }
//                         {item.itemTypeId == BookingItemTypeEnum.Room &&
//                           `${
//                             roomApiRes.roomTypes.find(rt => rt.id == roomApiRes.rooms.find(r => r.id == item.itemId).id).name
//                           } (#${roomApiRes.rooms.find(r => r.id == item.itemId).roomNumber})`
//                         }
//                       </span>
//                       <span>
//                         {formatPrice(item.unitPrice)} × {item.quantity}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   {isEditing ? (
//                     <>
//                       <Button size="sm" variant="outline" onClick={() => handleSave(`${item.bookingId}-${item.itemId}-${item.itemTypeId}`)}>
//                         <Save className="h-4 w-4 mr-1" /> Save
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => setEditingId(null)}
//                       >
//                         <X className="h-4 w-4 mr-1" /> Cancel
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(item)}
//                       >
//                         <Edit2 className="h-4 w-4 mr-1" /> Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDelete(item)}
//                       >
//                         <X className="h-4 w-4 mr-1" /> Delete
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             );
//           })}

//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default BookingItemPage;
