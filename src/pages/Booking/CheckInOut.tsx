import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface CheckInOutProps {
    checkIn: string;
    setCheckIn: React.Dispatch<React.SetStateAction<string>>;
    checkOut: string;
    setCheckOut: React.Dispatch<React.SetStateAction<string>>;
}

const CheckInOut: React.FC<CheckInOutProps> = ({ checkIn, setCheckIn, checkOut, setCheckOut }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thời gian</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Check-in</Label>
          <Input type="datetime-local" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        </div>
        <div>
          <Label>Check-out</Label>
          <Input type="datetime-local" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  )
}

export default CheckInOut;



