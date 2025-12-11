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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { format, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotelName: string;
  pricePerNight: number;
}

const BookingDialog = ({ open, onOpenChange, hotelName, pricePerNight }: BookingDialogProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Пожалуйста, выберите даты заезда и выезда");
      return;
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const message = `Здравствуйте! Хочу забронировать ${hotelName}
Заезд: ${format(checkIn, "dd MMMM yyyy", { locale: ru })}
Выезд: ${format(checkOut, "dd MMMM yyyy", { locale: ru })}
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
              <Label>Дата заезда</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {checkIn ? (
                      format(checkIn, "dd MMM yyyy", { locale: ru })
                    ) : (
                      <span className="text-gray-500">Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Дата выезда</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {checkOut ? (
                      format(checkOut, "dd MMM yyyy", { locale: ru })
                    ) : (
                      <span className="text-gray-500">Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
