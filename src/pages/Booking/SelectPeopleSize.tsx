import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';


interface CheckInOutProps {
    adults: number;
    setAdults: React.Dispatch<React.SetStateAction<number>>;
    children: number;
    setChildren: React.Dispatch<React.SetStateAction<number>>;
}


const SelectPeopleSize: React.FC<CheckInOutProps> = ({ adults, setAdults, children, setChildren }) => {
    const options = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), []);

    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Số người lớn */}
            <Card>
                <CardHeader>
                <CardTitle>Số người lớn</CardTitle>
                </CardHeader>
                <CardContent>
                <Select value={adults.toString()} onValueChange={v => setAdults(Number(v))}>
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {options.map(num => (
                        <SelectItem key={num} value={num.toString()}>
                        {num} người lớn
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </CardContent>
            </Card>

            {/* Số trẻ em */}
            <Card>
                <CardHeader>
                <CardTitle>Số trẻ em</CardTitle>
                </CardHeader>
                <CardContent>
                <Select value={children.toString()} onValueChange={v => setChildren(Number(v))}>
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {options.map(num => (
                        <SelectItem key={num} value={num.toString()}>
                        {num} trẻ em
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </CardContent>
            </Card>
        </div>
    )
}

export default SelectPeopleSize