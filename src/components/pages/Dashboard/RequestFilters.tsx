import {
  Container, Grid, Typography, Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import Select from 'react-select';
import useGeo from 'src/hooks/useGeo';
import FilterList from '@material-ui/icons/FilterList';
import useBreakpoint from 'src/hooks/useBreakpoint';
import { usePaginationStore } from 'src/stores/paginationStore';

interface RequestFiltersProps {
}

const useStyles = makeStyles((theme) => ({
  filterHeading: {
    textAlign: 'center',
    margin: '1rem 0 1rem 0',
  },
  filterContainer: {
    position: 'relative',
  },
  filterCollapsed: {
    marginTop: theme.spacing(4),
  },
  filterCount: {
    marginLeft: '10px',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RequestFilters: React.FC<RequestFiltersProps> = (props) => {
  const paginationRequests = usePaginationStore('dashboardRequestsFilters');
  const { states } = useGeo();
  const [districts, setDistricts] = React.useState([]);
  const isUpSm = useBreakpoint('sm');
  const classes = useStyles();

  const handleStateChange = (state: string) => {
    const newDistricts =
      states[state]?.map((el) => ({ value: el.city, label: el.city })) || [];
    setDistricts(newDistricts);
  };

  const renderCategory = () => {
    return (
      <Select
        selectComponent={Select.Creatable}
        style={{
          width: '300px',
        }}
        isClearable={true}
        value={paginationRequests.appliedFilters.requestCategory || null}
        placeholder="Select Category"
        onChange={(option) => {
          paginationRequests.setFilters({
            requestCategory: option,
          });
        }}
        options={[
          { value: 'plasma', label: 'Plasma' },
          { value: 'oxygen', label: 'Oxygen' },
          { value: 'medicine', label: 'Medicine' },
          { value: 'blood', label: 'Blood' },
          { value: 'money', label: 'Monetary' },
          { value: 'other', label: 'Other' },
        ]}
      />
    );
  };

  const renderState = () => {
    return (
      <Select
        isClearable={true}
        value={paginationRequests.appliedFilters.patientState || null}
        placeholder="Select State"
        onChange={(option) => {
          handleStateChange(option?.value);
          paginationRequests.setFilters({
            patientState: option,
          });
        }}
        options={Object.keys(states).map((key) => ({
          value: key,
          label: key,
        }))}
      />
    );
  };

  const renderDistrict = () => {
    return (
      <Select
        isClearable={true}
        // isDisabled={!districts.length}
        noOptionsMessage={() => 'Please select state first!'}
        value={paginationRequests.appliedFilters.patientDistrict || null}
        placeholder="Select District"
        options={districts}
        onChange={(option) => {
          paginationRequests.setFilters({
            patientDistrict: option,
          });
        }}
      />
    );
  };

  const renderContent = () => {
    return <Container maxWidth="md">
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Category</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderCategory()}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">State</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderState()}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">District</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderDistrict()}
          </Grid>
        </Grid>
      </form>
    </Container>;
  };

  const renderFiltersExpanded = () => {
    return (
      <Grid item md={3}>
        {
          <div className={classes.filterContainer}>
            {isUpSm ? (
              <Typography
                component="h1"
                variant="h5"
                className={classes.filterHeading}
              >
                Filters
              </Typography>
            ) : null}
            <div className={classes.filter}>
              {renderContent()}
              {/* {getFilters={(keys)=>setFilterResults(keys)} } */}
            </div>
          </div>
        }
      </Grid>
    );
  };

  const renderFiltersCollapsed = () => {
    return (
      <Grid item md={12}>
        <Accordion className={classes.filterCollapsed}>
          <AccordionSummary
            expandIcon={<FilterList />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Badge badgeContent={paginationRequests.filtersCount} color="primary">
              <Typography>Filters</Typography>
            </Badge>
          </AccordionSummary>
          <AccordionDetails>{renderContent()}</AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  return isUpSm ? renderFiltersExpanded() : renderFiltersCollapsed();
};

export default RequestFilters;
