import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Addon } from '@/types/Addon';
import { formatPrice } from "../../utils/formater.util";
import { AddonSelected } from './Booking';


interface BookingAddonProps {
  addons: Addon[];
  addonsSelected: AddonSelected[];
  setAddonsSelected: React.Dispatch<React.SetStateAction<AddonSelected[]>>;
}

const BookingAddon: React.FC<BookingAddonProps> = ({
    addons,
    addonsSelected,
    setAddonsSelected
}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Tiện ích bổ sung</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
            {addons.map(a => {
                const selected = addonsSelected.find(x => x.id === a.id);
                return (
                    <div key={a.id} className="flex items-center gap-2">
                        <Badge
                            variant={selected ? 'default' : 'outline'}
                            onClick={() => {
                            if (selected) {
                                setAddonsSelected(prev => prev.filter(x => x.id !== a.id));
                            } else {
                                setAddonsSelected(prev => [...prev, { id: a.id, quantity: 1 }]);
                            }
                            }}
                            className="cursor-pointer"
                        >
                            {a.name} (+{formatPrice(a.basePrice)})
                        </Badge>

                        {selected && (
                            <div className="flex items-center gap-2">
                                <Label htmlFor={`addon-${a.id}-qty`} className="whitespace-nowrap">Số lượng (người):</Label>
                                <input
                                    id={`addon-${a.id}-qty`}
                                    type="number"
                                    min={1}
                                    max={99}
                                    value={selected.quantity}
                                    onChange={e =>
                                        setAddonsSelected(prev =>
                                            prev.map(x => x.id === a.id ? { ...x, quantity: Number(e.target.value) } : x)
                                        )
                                    }
                                    className="w-16 border rounded px-1"
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </CardContent>
    </Card>
  )
}

export default BookingAddon;
