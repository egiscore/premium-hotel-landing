import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotelName: string;
  pricePerNight: number;
}

const BookingDialog = ({ open, onOpenChange, hotelName, pricePerNight }: BookingDialogProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Пожалуйста, выберите даты заезда и выезда");
      return;
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      };

      const message = `Здравствуйте! Хочу забронировать ${hotelName}
Заезд: ${formatDate(checkIn)}
Выезд: ${formatDate(checkOut)}
Количество гостей: ${guests}
Количество ночей: ${nights}
Итоговая стоимость: ${totalPrice.toLocaleString()} ₽`;

      onOpenChange(false);
      
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      setTimeout(() => {
        const messageInput = document.querySelector(
          'textarea[placeholder*="сообщение"]',
        ) as HTMLTextAreaElement;
        if (messageInput) {
          messageInput.value = message;
          messageInput.focus();
        }
      }, 500);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Бронирование</DialogTitle>
          <DialogDescription>{hotelName}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Дата заезда</Label>
              <Input
                id="checkIn"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Дата выезда</Label>
              <Input
                id="checkOut"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Количество гостей</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
            />
          </div>

          {nights > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {pricePerNight.toLocaleString()} ₽ × {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
                </span>
                <span className="font-medium">{totalPrice.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Итого</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            className="bg-gold hover:bg-gold/90 text-dark"
            onClick={handleBooking}
          >
            Забронировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
