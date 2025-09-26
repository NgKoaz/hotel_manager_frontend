import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là AI tư vấn khách sạn. Tôi có thể giúp bạn tìm phòng, giải đáp thắc mắc về dịch vụ, hoặc hỗ trợ đặt phòng. Bạn cần hỗ trợ gì?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('phòng') || message.includes('room')) {
      return 'Chúng tôi có các loại phòng: Standard (1.500.000 VNĐ/đêm), Deluxe (2.500.000 VNĐ/đêm), Suite (4.000.000 VNĐ/đêm). Tất cả phòng đều có WiFi miễn phí, điều hòa, TV, minibar. Bạn muốn xem chi tiết phòng nào?';
    }
    
    if (message.includes('đặt') || message.includes('booking')) {
      return 'Để đặt phòng, bạn có thể vào mục "Booking" trên website. Bạn cần chọn ngày check-in, check-out, loại phòng và điền thông tin cá nhân. Tôi có thể hướng dẫn bạn từng bước nếu cần!';
    }
    
    if (message.includes('giá') || message.includes('price')) {
      return 'Giá phòng hiện tại:\n- Standard: 1.500.000 VNĐ/đêm\n- Deluxe: 2.500.000 VNĐ/đêm\n- Suite: 4.000.000 VNĐ/đêm\n\nGiá đã bao gồm thuế và phí dịch vụ. Có chương trình ưu đãi cho khách đặt từ 3 đêm trở lên!';
    }
    
    if (message.includes('dịch vụ') || message.includes('service')) {
      return 'Khách sạn cung cấp:\n- Nhà hàng 24/7\n- Spa & Massage\n- Hồ bơi ngoài trời\n- Phòng gym\n- Dịch vụ giặt ủi\n- Đưa đón sân bay\n- Tour du lịch\nBạn quan tâm dịch vụ nào cụ thể?';
    }
    
    if (message.includes('địa chỉ') || message.includes('location')) {
      return 'Khách sạn tọa lạc tại trung tâm thành phố, cách sân bay 30 phút lái xe. Địa chỉ chính xác sẽ được cung cấp khi bạn đặt phòng thành công.';
    }
    
    if (message.includes('hủy') || message.includes('cancel')) {
      return 'Chính sách hủy phòng:\n- Miễn phí hủy trước 24h\n- Hủy trong vòng 24h: phí 50% giá phòng\n- Không xuất hiện: tính 100% giá phòng\nBạn có thể hủy qua website hoặc gọi hotline.';
    }
    
    return 'Cảm ơn bạn đã liên hệ! Tôi có thể hỗ trợ bạn về: thông tin phòng, giá cả, đặt phòng, dịch vụ khách sạn, chính sách hủy phòng. Bạn có câu hỏi cụ thể nào khác không?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="fixed bottom-24 right-6 w-96 h-96 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">AI Tư Vấn Khách Sạn</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`p-2 rounded-full ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-gray-200">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Nhập câu hỏi của bạn..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;