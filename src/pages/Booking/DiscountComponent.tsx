import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Discount } from '@/types/Discount';

interface DiscountComponentProps {
  discounts: Discount[];
  discountsSelected: number[];
  setDiscountsSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

const DiscountComponent: React.FC<DiscountComponentProps> = ({
  discounts,
  discountsSelected,
  setDiscountsSelected,
}) => {
  const toggleDiscount = (id: number) => {
    if (discountsSelected.includes(id)) {
      setDiscountsSelected(prev => prev.filter(c => c !== id));
    } else {
      setDiscountsSelected(prev => [...prev, id]);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Mã giảm giá</CardTitle></CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {discounts.map(d => {
          const selected = discountsSelected.includes(d.id);
          return (
            <Badge
              key={d.id}
              variant={selected ? 'default' : 'outline'}
              onClick={() => toggleDiscount(d.id)}
              className="cursor-pointer"
            >
              {d.code} - {d.percent}%
            </Badge>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default DiscountComponent;
