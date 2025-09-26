import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const FilterBookingHistory = ({searchTerm, setSearchTerm, statusFilter, setStatusFilter}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Tìm kiếm</Label>
            <Input
              id="search"
              placeholder="Tên khách, email, phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="cancelled">Đã hủy</option>
              <option value="completed">Hoàn thành</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}>
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterBookingHistory