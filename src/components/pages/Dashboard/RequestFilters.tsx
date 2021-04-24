import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useGeo from "src/hooks/useGeo";
import { FiltersType, RequestType } from "src/types";

interface RequestFiltersProps {
  onChangeFilter: (updatedFilters: Partial<FiltersType>) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = (props) => {
  const { onChangeFilter } = props;
  const defaultValues = {
    requestCategory: undefined,
    patientState: undefined,
    patientDistrict: undefined,
  } as RequestType;
  const { control } = useForm({ defaultValues });
  const { states } = useGeo();
  const [districts, setDistricts] = React.useState([]);

  const handleStateChange = (state: string) => {
    const newDistricts =
      states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
  };

  const renderCategory = () => {
    return (
      <Controller
        name="requestCategory"
        control={control}
        render={({ field }) => {
          return (
            <Select
              isClearable={true}
              {...field}
              placeholder="Select Category"
              onChange={(option) => {
                onChangeFilter({
                  requestCategory: option?.value,
                });
                field?.onChange(option);
              }}
              options={[
                { value: "plasma", label: "Plasma" },
                { value: "oxygen", label: "Oxygen" },
                { value: "medicine", label: "Medicine" },
                { value: "blood", label: "Blood" },
                { value: "money", label: "Monetary" },
                { value: "other", label: "Other" },
              ]}
            />
          );
        }}
      />
    );
  };

  const renderState = () => {
    return (
      <Controller
        name="patientState"
        control={control}
        render={({ field }) => (
          <Select
            isClearable={true}
            {...field}
            placeholder="Select State"
            onChange={(option) => {
              handleStateChange(option?.value);
              onChangeFilter({
                patientState: option?.value,
              });
              field?.onChange(option);
            }}
            options={Object.keys(states).map((key) => ({
              value: key,
              label: key,
            }))}
          />
        )}
      />
    );
  };

  const renderDistrict = () => {
    return (
      <Controller
        name="patientDistrict"
        control={control}
        render={({ field }) => (
          <Select
            isClearable={true}
            // isDisabled={!districts.length}
            noOptionsMessage={() => "Please select state first!"}
            {...field}
            placeholder="Select District"
            options={districts}
            onChange={(option) => {
              onChangeFilter({
                patientDistrict: option?.value,
              });
              field?.onChange(option);
            }}
          />
        )}
      />
    );
  };

  return (
    <Container maxWidth="md">
      <form>
        <Grid container spacing={1}>
          <Grid container xs={12} sm={12}>
            <Grid container xs={12} sm={12}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Category</Typography>
              </Grid>
              <Grid item xs={12}>
                {renderCategory()}
              </Grid>
            </Grid>

            <Grid container xs={12} sm={12}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">State</Typography>
              </Grid>
              <Grid item xs={12}>
                {renderState()}
              </Grid>
            </Grid>

            <Grid container xs={12} sm={12}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">District</Typography>
              </Grid>
              <Grid item xs={12}>
                {renderDistrict()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RequestFilters;
