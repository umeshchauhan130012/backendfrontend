"use client";
import React, { useState } from "react";
import {
  Radio,
  Typography,
  MobileStepper,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  styled,
  SelectChangeEvent,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { UploadFile } from "@mui/icons-material";
import {
  LabSystem,
  Manufacturer,
  Platform,
  TeethData,
  Tooth,
} from "@/constants/types";
import Image from "next/image";
import {
  useAddClinicDocument,
  useAddLabOrder,
  useFetchLabSystem,
  useFetchManufacturer,
  useFetchPlatformSize,
} from "@/apis/doctor";
import toast from "react-hot-toast";
import BabylonScene from "./BabylonScene";
import TeethComponent from "./TeethComponent";

interface OrderSteperProps {
  setSelectedOrder: React.Dispatch<React.SetStateAction<TeethData>>;
  selectedOrder: TeethData;
  selectedPatient: any;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

interface StepNumberProps {
  active: boolean;
  completed: boolean;
}

const OrderSteper: React.FC<OrderSteperProps> = ({
  setSelectedOrder,
  selectedPatient,
  setActiveStep,
  activeStep,
}) => {
  const [activeMobileStep, setActiveMobileStep] = useState<number>(0);
  const steps = ["Item", "Teeth", "Implants", "Final"];
  const [images, setImages] = useState<File | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);
  const [selectedLabSystem, setSelectedLabSystem] = useState<LabSystem | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [responseData, setResponsedata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileType, setselectedFileType] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>(""); // Default to empty string
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const [selectedTeeth, setSelectedTeeth] = useState<Tooth[]>([]);

  const { data: platformSizeData } = useFetchPlatformSize();
  const { data: manufacturerData } = useFetchManufacturer();
  const { data: labSystemData } = useFetchLabSystem();

  const { mutateAsync: addLabOrder } = useAddLabOrder();
  const {
    mutateAsync: addClinicDocumentApi,
    isPending: addClinicDocumentPending,
  } = useAddClinicDocument();

  const handleNext = (type = "web") => {
    if (activeStep < 4 && type === "web") {
      setActiveStep((prevStep: any) => prevStep + 1);
    }
    if (activeMobileStep < 3 && type === "mobile") {
      setActiveMobileStep((prevStep: any) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep: any) => prevStep - 1);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // const getToothColor = (toothId: string) => {
  //   const tooth = teeth?.find((t) => t.id === toothId);
  //   if (!tooth) return "#e0e0e0";

  //   const isSelected = selectedTeeth?.some((tooth) => tooth.id === toothId);

  //   return isSelected ? tooth.color : "";
  // };

  // const toggleTooth = (tooth: Tooth) => {
  //   setSelectedTeeth((prev) =>
  //     prev.some((selectedTooth) => selectedTooth.id === tooth.id)
  //       ? prev.filter((selectedTooth) => selectedTooth.id !== tooth.id)
  //       : [...prev, tooth]
  //   );
  // };

  const handleManufacturerChange = (event: SelectChangeEvent<number>) => {
    const manufacturer = manufacturerData?.find(
      (item: Manufacturer) =>
        item.manufacturer_id === Number(event.target.value)
    );
    setSelectedManufacturer(manufacturer || null);
    setSelectedLabSystem(null);
    setSelectedPlatform(null);
  };

  const handleLabSystemChange = (event: SelectChangeEvent<number>) => {
    const labSystem = labSystemData?.find(
      (item: LabSystem) => item.system_id === Number(event.target.value)
    );
    setSelectedLabSystem(labSystem || null);
    setSelectedPlatform(null);
  };

  const handlePlatformSizeChange = (event: SelectChangeEvent<number>) => {
    const singlePlatform = platformSizeData?.find(
      (item: Platform) => item.platform_size_id === Number(event.target.value)
    );
    setSelectedPlatform(singlePlatform || null);
  };

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product);
    handleNext("web");
  };

  const firstStep = async (step: string) => {
    const data: any = {
      patient_id: selectedPatient?.patient_id,
      product_type: selectedProduct,
      material: "any",
      manufacturer: selectedManufacturer?.name,
      system: selectedLabSystem?.name,
      platform_size: selectedPlatform?.size,
      teeth_selection: selectedTeeth.map((tooth) => {
        return {
          tooth_number: tooth.tooth_number,
          teeth_color_code: tooth.color,
          jaw: tooth.jaw?.toUpperCase(),
          tooth_type: tooth?.tooth_type?.replaceAll(" ", "")?.toUpperCase(),
        };
      }),
      step: 1,
    };

    if (step == "second") {
      delete data.step;
      data.case_id = responseData?.case_id;
      data.order_id = responseData?.order_id;
      data.delivery_type = deliveryType;
      data.finalize = true;
      data.notes = deliveryAddress;
    }

    try {
      const res = await addLabOrder(data);
      if (res?.data?.order_id && step == "first") {
        setResponsedata(res?.data);
        handleNext("mobile");
      }
      if (res?.data?.step == 2 && step == "second") {
        handleNext("web");
        setTimeout(() => {
          setActiveStep(4);
          setResponsedata(null);
          setDeliveryAddress("");
          setDeliveryType("");
          setImages(null);
          setSelectedLabSystem(null);
          setSelectedManufacturer(null);
          setSelectedPlatform(null);
          setSelectedProduct("");
          setSelectedTeeth([]);
          setSelectedOrder({} as TeethData);
        }, 3000);
      }
    } catch (error) {
      console.log("Error adding lab order:", error);
    }
  };

  // Function to upload the file
  const uploadImageToServer = async () => {
    if (selectedFile && !isLoading) {
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      formData.append("document_type", selectedFileType);
      formData.append("lab_order_id", responseData?.order_id);

      try {
        const response = await addClinicDocumentApi(formData);
        if (response?.file_name) {
          toast.success("File uploaded successfully!");
          setSelectedFile(null);
          setImages(null);
          setselectedFileType("");
          handleNext("mobile");
        } else {
          setSelectedFile(null);
          setImages(null);
          setselectedFileType("");
        }
      } catch (error) {
        console.error(`error: ${error}`);
        //toast.error("Error uploading file. Please try again.");
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      let fileType = file.type;
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileType && fileExtension) {
        if (fileExtension === "stl") {
          fileType = "application/sla";
        } else if (fileExtension === "glb") {
          fileType = "model/glb";
        }
      }

      if (file && fileExtension !== "stl" && fileExtension !== "glb") {
        toast.error("Invalid file format. Please upload an STL or GLB file.");
        return;
      }

      try {
        setImages(file);
        setSelectedFile(file);
        setselectedFileType(fileType);
      } catch (error) {
        console.error(`error: ${error}`);
        setImages(null);
        setSelectedFile(null);
        setselectedFileType("");
        toast.error("Failed to upload the file. Please try again.");
      }
    } else {
      toast.error("Please select a file.");
    }
  };

  const StepNumber = styled(Box, {
    shouldForwardProp: (prop) => prop !== "completed" && prop !== "active",
  })<StepNumberProps>(({ active, completed }) => ({
    width: 40,
    height: 40,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    backgroundColor: completed || active ? "#A1E3B4" : "#F7F7F7", // Active: Green, Inactive: Light Gray
    color: completed || active ? "#00711F" : "#A0A0A0", // Text color
    transition: "background-color 0.3s ease",
  }));


  
  return (
    <>
      <Box className="p-3 rounded-xl shadow-none w-full mx-auto relative bg-white">
        <Box className="p-2 rounded-t-lg bg-telwin-light-blue flex items-center">
          <Image src="/order1.gif" alt="order" width={50} height={50} />
          <Typography className="font-bold ms-4 text-gray-600">
            Helps us understand the order to get Vikas a great smile
          </Typography>
        </Box>
        {/* Stepper */}
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          className="mb-6 order-steps rounded-t-none rounded-b-lg sticky top-5 z-20"
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={index < activeStep}
              className="stepBullet"
            >
              <StepLabel
                StepIconComponent={() => (
                  <StepNumber
                    active={index === activeStep}
                    completed={index < activeStep}
                    className={"bltCss"}
                  >
                    {index + 1} {/* Shows just the step number */}
                  </StepNumber>
                )}
              >
                <Box
                  sx={{
                    fontWeight: index <= activeStep ? "bold" : "normal",
                    color: index <= activeStep ? "#000" : "#A0A0A0",
                  }}
                >
                  {label}
                </Box>
                {/* {activeStep === index} */}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form Content */}
        <Box className="rounded-0 shadow-none">
          {activeStep === 0 && (
            <>
              <Typography variant="h2" className="order-heading my-3 mx-2">
                What implant solution are we giving them?
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  size={{ xs: 12, sm: 4 }}
                  onClick={() => handleSelectProduct("Implant")}
                  className="cursor-pointer"
                >
                  <Box className="teeth-block">
                    <Image
                      src="/assets/images/teeth11.png"
                      alt="Implant"
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box className="h-24-0">
                    <Typography variant="h6" className="serviceTitle">
                      Implant
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 4 }}
                  onClick={() => handleSelectProduct("Implant Bridge")}
                  className="cursor-pointer"
                >
                  <Box className="teeth-block">
                    <Image
                      src="/assets/images/teeth2.png"
                      alt="Implant Bridge"
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box className="h-24-0">
                    <Typography variant="h6" className="serviceTitle">
                      Implant Bridge
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 4 }}
                  onClick={() => handleSelectProduct("Surgical guide")}
                  className="cursor-pointer"
                >
                  <Box className="teeth-block">
                    <Image
                      src="/assets/images/teeth3.png"
                      alt="Surgical guide"
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box className="h-24-0">
                    <Typography variant="h6" className="serviceTitle">
                      Surgical guide
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h2" className="order-heading my-3 mx-2">
                What implant solution are we giving them?
              </Typography>
              <Box className="">
                <Grid container spacing={3} className="items-center">
                  <Grid size={{ xs: 12, sm: 7, md: 6, xl: 5 }}>
                    <TeethComponent
                      setSelectedTeeth={setSelectedTeeth}
                      selectedTeeth={selectedTeeth}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 5, md: 6, xl: 7 }}>
                    <Box mt={2}>
                      {/* <Typography variant='h6'>Selected Teeth:</Typography> */}
                      <Typography className="teath-number">
                        {selectedTeeth.length > 0
                          ? selectedTeeth
                              ?.map((tooth) => tooth?.tooth_number)
                              .join(", ")
                          : ""}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="success"
                      disabled={selectedTeeth.length === 0}
                      onClick={() => handleNext("web")}
                      className="rounded-lg capitalize mt-3"
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {activeStep === 2 && (
            <>
              <MobileStepper
                variant="dots"
                steps={3}
                position="static"
                activeStep={activeMobileStep}
                sx={{ maxWidth: 400, flexGrow: 1 }}
                className="mobileSteps"
                backButton={
                  <Button
                    size="small"
                    onClick={() => handleBack()}
                    disabled={activeMobileStep === 0}
                    className="display-none"
                  >
                    Back
                  </Button>
                }
                nextButton={
                  <Button
                    size="small"
                    onClick={() => handleNext("mobile")}
                    disabled={activeMobileStep === 2}
                    className="display-none"
                  >
                    Next
                  </Button>
                }
              />
              <Box className="mb-6 bg-white rounded-2xl user-registration labForms">
                {activeMobileStep === 0 && (
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h2" className="order-heading">
                        What implant are solution is being used in 5, 6 & 7
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                      <Box className="mb-3">
                        <InputLabel className="mb-2">Manufacturer</InputLabel>
                        <FormControl className="w-full form-fields order-form-field">
                          <Select
                            label="Manufacturer"
                            name="Manufacturer"
                            value={selectedManufacturer?.manufacturer_id || ""}
                            onChange={handleManufacturerChange}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <span>Select dropdown here</span>
                            </MenuItem>
                            {manufacturerData &&
                              manufacturerData?.length &&
                              manufacturerData?.map(
                                (manufacturer: Manufacturer) => (
                                  <MenuItem
                                    key={manufacturer.manufacturer_id}
                                    value={manufacturer.manufacturer_id}
                                  >
                                    {manufacturer.name}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Box>

                      <Box className="mb-3">
                        <InputLabel className="mb-2">System</InputLabel>
                        <FormControl
                          className="w-full form-fields order-form-field"
                          variant="outlined"
                        >
                          <Select
                            label="System"
                            name="System"
                            value={selectedLabSystem?.system_id || ""}
                            onChange={handleLabSystemChange}
                            disabled={!selectedManufacturer}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <span>Select dropdown here</span>
                            </MenuItem>
                            {labSystemData &&
                              labSystemData?.length &&
                              labSystemData?.map((labSystem: LabSystem) => (
                                <MenuItem
                                  key={labSystem.system_id}
                                  value={labSystem.system_id}
                                >
                                  {labSystem.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <Box className="mb-4">
                        <InputLabel className="mb-2">Platform Size</InputLabel>
                        <FormControl
                          className="w-full form-fields order-form-field"
                          variant="outlined"
                        >
                          <Select
                            label="Platform Size"
                            name="PlatformSize"
                            value={selectedPlatform?.platform_size_id || ""}
                            onChange={handlePlatformSizeChange}
                            disabled={!selectedLabSystem}
                            displayEmpty
                          >
                            <MenuItem disabled value="">
                              <span>Select dropdown here</span>
                            </MenuItem>
                            {platformSizeData &&
                              platformSizeData?.length &&
                              platformSizeData?.map((platform: Platform) => (
                                <MenuItem
                                  key={platform.platform_size_id}
                                  value={platform.platform_size_id}
                                >
                                  {platform.size}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Next Button */}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => firstStep("first")}
                        className="capitalize rounded-lg"
                      >
                        Next
                      </Button>
                    </Grid>
                    <Grid
                      size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
                      className="text-left"
                    >
                      <h3 className="font-bold custom-heading">Use this scan body</h3>
                      <Box
                        width={260}
                        height={230}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#D9D9D9"
                        borderRadius={2}
                        overflow="hidden"
                      >

                      </Box>
                      <Typography className="ms-4 text-gray-600">
                      #model
                      </Typography>
                      <Typography className="ms-4 text-gray-600">
                      #Mandufacture details
                      </Typography>
                    </Grid>
                    <Grid
                      size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
                      className="text-center"
                    >
                      <Image
                        src="/order1.gif"
                        alt="order"
                        width={200}
                        height={200}
                        className="m-auto"
                      />

                      <Typography className="ms-4 text-gray-600">
                      Can’t find you implant system?
                      <strong>Call us</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {activeMobileStep === 1 && (
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h2" className="order-heading">
                        Question 2
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                      <InputLabel className="mb-2">Upload scans</InputLabel>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        endIcon={<UploadFile />}
                        className="w-full shadow-none rounded-xl h-14 bg-white border-gray-200 border capitalize mt-2 mb-4 text-gray-400 flex justify-between uploadField"
                        sx={{ border: "1px solid #bbb" }}
                      >
                        Upload from computer
                        <VisuallyHiddenInput
                          type="file"
                          accept=".stl,.glb"
                          onChange={handleImageUpload}
                        />
                      </Button>
                      {/* Next Button */}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={uploadImageToServer}
                        className="capitalize rounded-lg"
                        disabled={addClinicDocumentPending || isLoading}
                      >
                        {addClinicDocumentPending ? "Uploading..." : "Next"}
                      </Button>
                    </Grid>
                    <Grid
                      size={{ xs: 12, sm: 12, md: 8, lg: 8 }}
                      className="text-center scanCanvas"
                    >
                      {!images ? (
                        <Box className="h-60 py-28 bg-gray-100 rounded-lg">
                          Scan preview
                        </Box>
                      ) : (
                        <BabylonScene
                          images={images}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
                {activeMobileStep === 2 && (
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h2" className="order-heading">
                        Let’s pack this up
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
                      <Box className="mb-3">
                        <InputLabel className="mb-3">
                          Delivery address
                        </InputLabel>

                        {/* Input field for delivery address */}
                        <FormControl className="w-full form-fields order-form-field dileveryForm">
                          <Input
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Enter delivery address"
                            fullWidth
                            className="deliveryBox"
                          />
                        </FormControl>
                      </Box>
                      <Box className="mb-3">
                        <InputLabel className="mb-3">
                          Type of delivery
                        </InputLabel>

                        {/* Express Delivery Option */}
                        <Box className="flex mb-3 p-3 border rounded-2xl">
                          <Box className="ms-2 flex-grow">
                            <Typography className="clinic-name">
                              Express
                            </Typography>
                            <Typography className="clinic-name">
                              [$20 charged extra, 2 day delivery]
                            </Typography>
                          </Box>
                          <Radio
                            color="success"
                            value="express"
                            checked={deliveryType === "express"} // Check if express is selected
                            onChange={(event) =>
                              setDeliveryType(event.target.value)
                            }
                          />
                        </Box>

                        {/* Normal 5-Day Delivery Option */}
                        <Box className="flex mb-3 p-3 border rounded-2xl">
                          <Box className="ms-2 flex-grow">
                            <Typography className="clinic-name">
                              Normal
                            </Typography>
                            <Typography className="clinic-name">
                              [5 days delivery]
                            </Typography>
                          </Box>
                          <Radio
                            color="success"
                            value="normal"
                            checked={deliveryType === "normal"} // Check if normal is selected
                            onChange={(event) =>
                              setDeliveryType(event.target.value)
                            }
                          />
                        </Box>
                      </Box>
                      {/* Next Button */}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          firstStep("second");
                        }}
                        className="capitalize rounded-lg"
                      >
                        Next
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }}>
                      <Box className="border border-gray-300 rounded-lg p-4 implantCard">
                        {/* Header */}
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {responseData?.product_type}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          {responseData?.manufacturer}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {responseData?.system}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {responseData?.platform_size}
                        </Typography>

                        {/* Material */}
                        <Typography variant="body2">
                          Material <strong>{responseData?.material}</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Shades <strong>GingivalN/ABaseA2IncisalN/A</strong>
                        </Typography>

                        {/* Preferences */}
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold", mt: 1 }}
                        >
                          Occlusal Contact Tightness:{" "}
                          <span style={{ color: "#000" }}>Light</span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold" }}
                        >
                          Occlusal Staining Preference:{" "}
                          <span style={{ color: "#000" }}>None</span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold" }}
                        >
                          No Occlusal Clearance Preference:{" "}
                          <span style={{ color: "#000" }}>Call Doctor</span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold" }}
                        >
                          Anatomical Design Preference (within reason):{" "}
                          <span style={{ color: "#000" }}>
                            Aesthetics over ideal occlusion
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold" }}
                        >
                          Interproximal Contact Design:{" "}
                          <span style={{ color: "#000" }}>Ideal</span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", fontWeight: "bold" }}
                        >
                          Proximal Contact Tightness:{" "}
                          <span style={{ color: "#000" }}>Drop In</span>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </>
          )}
          {activeStep === 3 && (
            <Box className="text-center">
              <Image
                src="/order1.gif"
                alt="order"
                width={200}
                height={200}
                className="m-auto"
              />
              <Typography variant="h4" className="font-bold text-gray-600">
                Order confirmed
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderSteper;
