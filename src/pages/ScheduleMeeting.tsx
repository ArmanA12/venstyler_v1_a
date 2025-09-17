import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, Clock, MapPin, Phone, ArrowLeft, CheckCircle, Plus, Home } from "lucide-react";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import axios from "axios";


interface Address {
  id: number;
  label: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

interface ExistingMeeting {
  id: number;
  date: string;
  time: string;
  type: string;
  address?: Address;
  notes?: string;
}

const ScheduleMeeting = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingType, setMeetingType] = useState("HOME_VISIT");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Address related state
  const [addressOption, setAddressOption] = useState("existing");
  const [existingAddresses, setExistingAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(7);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  
  // New address form state
  const [newAddress, setNewAddress] = useState({
    label: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false
  });
  
  // Existing meeting state
  const [existingMeeting, setExistingMeeting] = useState<ExistingMeeting | null>(null);
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(true);

  // Available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const meetingOptions = [
    {
      value: "HOME_VISIT",
      label: "Home Visit",
      description: "Our master will visit your home for measurement",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      value: "PHONE_CALL",
      label: "Phone Consultation",
      description: "Get measurement guidance over phone call",
      icon: <Phone className="h-5 w-5" />
    }
  ];

  // Fetch existing addresses when home visit is selected
  useEffect(() => {
    if (meetingType === "HOME_VISIT" && addressOption === "existing") {
      fetchExistingAddresses();
    }
  }, [meetingType, addressOption]);

  // Fetch existing meeting details
  useEffect(() => {
    fetchExistingMeeting();
  }, [orderId]);

  const fetchExistingAddresses = async () => {
    setIsLoadingAddresses(true);
    try {
      const response = await axios.get(
        "https://venstyler.armanshekh.com/api/order/current-user-shipping-address",
        { withCredentials: true }
      );
      
      console.log(response.data, "fatching existing address");

      if (response.data?.success) {
        if (Array.isArray(response.data.addresses) && response.data.addresses.length > 0) {
          setExistingAddresses(response.data.addresses);
          setSelectedAddressId(response.data.addresses[0]?.id ?? null);
        } else if (response.data.shippingAddress) {
          const sa = response.data.shippingAddress;
          const pseudoAddress: Address = {
            id: 0,
            label: `${sa.shippingName || "Shipping Address"}`,
            fullAddress: sa.shippingAddress || "",
            city: sa.shippingCity || "",
            state: sa.shippingState || "",
            pincode: sa.shippingPincode || "",
            country: sa.shippingCountry || "India",
            isDefault: true,
          };
          setExistingAddresses([pseudoAddress]);
          setSelectedAddressId(7);
        } else {
          setExistingAddresses([]);
          setSelectedAddressId(null);
        }
      } else {
        setExistingAddresses([]);
        setSelectedAddressId(null);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const fetchExistingMeeting = async () => {
    try {
      const response = await axios.get(
        `https://venstyler.armanshekh.com/api/meeting/orders/${orderId}/meetings`,
        { withCredentials: true }
      );
      
      if (response.data.success && response.data.meeting) {
        const meeting = response.data.meeting;
        setExistingMeeting(meeting);
        setSelectedDate(new Date(meeting.date));
        setSelectedTime(meeting.time);
        setMeetingType(meeting.type);
        setNotes(meeting.notes || "");
        if (meeting.address) {
          setSelectedAddressId(meeting.address.id);
        }
      }
    } catch (error) {
      console.error("Error fetching meeting:", error);
    } finally {
      setIsLoadingMeeting(false);
    }
  };

  const handleCreateAddress = async () => {
    if (!newAddress.label || !newAddress.fullAddress || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsCreatingAddress(true);
    try {
      const response = await axios.post(
        "https://venstyler.armanshekh.com/api/user/addresses/createAddress",
        newAddress,
        { withCredentials: true }
      );
      console.log(response.data, "response", response)
      if (response.data.success) {
        toast.success("Address created successfully!");
        setSelectedAddressId(response.data.data.id);
        setAddressOption("existing");
        fetchExistingAddresses();
      } else {
        toast.error(response.data.message || "Failed to create address");
      }
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error("Failed to create address");
    } finally {
      setIsCreatingAddress(false);
    }
  };

const handleSchedule = async () => {
  if (!selectedDate || !selectedTime || !meetingType) {
    toast.error("Please select date, time, and meeting type");
    return;
  }

  if (meetingType === "HOME_VISIT") {
    if (addressOption === "new" && !selectedAddressId) {
      toast.error("Please create and save new address before scheduling");
      return;
    }
    if (addressOption === "existing" && !selectedAddressId) {
      toast.error("Please select an existing address");
      return;
    }
  }

  setIsSubmitting(true);

  try {
    // Combine date + time
    const scheduledAt = new Date(selectedDate);
    const [time, modifier] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    scheduledAt.setHours(hours, minutes, 0, 0);

    const meetingData: any = {
      type: meetingType,
      scheduledAt: scheduledAt.toISOString(),
      notes,
    };

    if (meetingType === "HOME_VISIT") {
      if (addressOption === "new" && selectedAddressId) {
        meetingData.addressId = selectedAddressId;   // naya address id
        meetingData.isExistingAddress = false;
      } else if (addressOption === "existing") {
        meetingData.addressId = selectedAddressId;   // existing address id
        meetingData.isExistingAddress = true;
      }
    }

    const response = await axios.post(
      `https://venstyler.armanshekh.com/api/meeting/orders/${orderId}/meetings`,
      meetingData,
      { withCredentials: true }
    );

    if (response.data.success) {
      toast.success("Meeting scheduled successfully!");
      navigate(`/order-processing/${orderId}`);
    } else {
      toast.error(response.data.message || "Failed to schedule meeting");
    }
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    toast.error("Failed to schedule meeting. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Disable past dates and today
    return date < tomorrow;
  };

  if (isLoadingMeeting) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">Loading meeting details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/order-processing/${orderId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {existingMeeting ? "Meeting Details" : "Schedule Measurement"}
              </h1>
              <p className="text-muted-foreground">Order #{orderId}</p>
            </div>
          </div>

          {/* Existing Meeting Details */}
          {existingMeeting && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Meeting Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-sm text-green-600">Type:</span>
                    <p className="text-green-800">
                      {meetingOptions.find(opt => opt.value === existingMeeting.type)?.label}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-green-600">Date:</span>
                    <p className="text-green-800">{new Date(existingMeeting.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-green-600">Time:</span>
                    <p className="text-green-800">{existingMeeting.time}</p>
                  </div>
                </div>
                {existingMeeting.address && (
                  <div className="pt-2 border-t border-green-200">
                    <span className="font-medium text-sm text-green-600">Address:</span>
                    <div className="bg-green-100 p-3 rounded-lg mt-1">
                      <p className="font-medium text-green-800">{existingMeeting.address.label}</p>
                      <p className="text-green-700">{existingMeeting.address.fullAddress}</p>
                      <p className="text-green-700">
                        {existingMeeting.address.city}, {existingMeeting.address.state} {existingMeeting.address.pincode}
                      </p>
                      <p className="text-green-700">{existingMeeting.address.country}</p>
                    </div>
                  </div>
                )}
                {existingMeeting.notes && (
                  <div className="pt-2 border-t border-green-200">
                    <span className="font-medium text-sm text-green-600">Notes:</span>
                    <p className="text-green-700 mt-1">{existingMeeting.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!existingMeeting && (
            <>
              {/* Meeting Type Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Meeting Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={meetingType} onValueChange={setMeetingType}>
                    {meetingOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-muted-foreground mt-1">
                            {option.icon}
                          </div>
                          <div>
                            <Label htmlFor={option.value} className="font-medium cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Address Selection for Home Visit */}
              {meetingType === "HOME_VISIT" && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Select Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={addressOption} onValueChange={setAddressOption}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="existing" id="existing" />
                        <Label htmlFor="existing" className="font-medium cursor-pointer">
                          Use existing address
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new" className="font-medium cursor-pointer">
                          Add new address
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Existing Addresses */}
                    {addressOption === "existing" && (
                      <div className="mt-4">
                        {isLoadingAddresses ? (
                          <div className="text-center py-4">Loading addresses...</div>
                        ) : existingAddresses.length > 0 ? (
                          <RadioGroup value={selectedAddressId?.toString()} onValueChange={(value) => setSelectedAddressId(Number(value))}>
                            {existingAddresses.map((address) => (
                              <div key={address.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor={`address-${address.id}`} className="font-medium cursor-pointer block">
                                    {address.label}
                                    {address.isDefault && (
                                      <Badge variant="secondary" className="ml-2 text-xs">Default</Badge>
                                    )}
                                  </Label>
                                  <div className="mt-2 p-3 bg-muted rounded-lg">
                                    <p className="text-sm">{address.fullAddress}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {address.city}, {address.state} {address.pincode}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{address.country}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            No addresses found. Please add a new address.
                          </div>
                        )}
                      </div>
                    )}

                    {/* New Address Form */}
                    {addressOption === "new" && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="label">Address Label</Label>
                            <Input
                              id="label"
                              placeholder="e.g. Home, Office"
                              value={newAddress.label}
                              onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="fullAddress">Full Address</Label>
                          <Textarea
                            id="fullAddress"
                            placeholder="Enter complete address"
                            value={newAddress.fullAddress}
                            onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              placeholder="State"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                              id="pincode"
                              placeholder="Pincode"
                              value={newAddress.pincode}
                              onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="isDefault"
                            checked={newAddress.isDefault}
                            onCheckedChange={(checked) => setNewAddress({...newAddress, isDefault: !!checked})}
                          />
                          <Label htmlFor="isDefault">Set as default address</Label>
                        </div>
                        <Button 
                          onClick={handleCreateAddress} 
                          disabled={isCreatingAddress}
                          className="w-full"
                        >
                          {isCreatingAddress ? "Creating..." : "Save Address"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}


              {/* Date Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Time Selection */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Additional Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any specific requirements or instructions for the measurement session..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Summary */}
              {selectedDate && selectedTime && meetingType && (meetingType === "PHONE_CALL" || selectedAddressId !== null) && (
                <Card className="mb-6 bg-accent/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Meeting Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <span>{meetingOptions.find(opt => opt.value === meetingType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{selectedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    {meetingType === "HOME_VISIT" && selectedAddressId && (
                      <div className="pt-2 border-t">
                        <span className="font-medium">Address:</span>
                        {(() => {
                          const selectedAddress = existingAddresses.find(addr => addr.id === selectedAddressId);
                          return selectedAddress ? (
                            <div className="mt-1 p-2 bg-muted rounded text-sm">
                              <p className="font-medium">{selectedAddress.label}</p>
                              <p>{selectedAddress.fullAddress}</p>
                              <p>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}</p>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                    {notes && (
                      <div className="pt-2 border-t">
                        <span className="font-medium">Notes:</span>
                        <p className="text-sm text-muted-foreground mt-1">{notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/order-processing/${orderId}`)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSchedule}
                  disabled={!selectedDate || !selectedTime || !meetingType || isSubmitting || (meetingType === "HOME_VISIT" && selectedAddressId === null)}
                  className="flex-1"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;