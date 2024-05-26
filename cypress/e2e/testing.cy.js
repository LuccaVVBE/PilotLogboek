describe("Check if the site is online", () => {
  it("Runs the application", () => { 
    cy.visit('http://localhost:3000'); 
    cy.get('[data-cy=nav-bar]').should('exist');
  });
});

describe("Not logged in", () => {
  it("Cannot reach dashboard page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-dashboard]').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login required');
  });

  it("Cannot reach profile page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-profile]').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login required');
  });
  it("Cannot reach planes page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-planes]').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login required');
  });
});

describe("Logged in", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Can reach dashboard page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-dashboard]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=add_flight').should('exist');
  });

  it("Can reach profile page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-profile]').click();
    cy.url().should('include', '/profile');
    cy.get('[data-cy=update_profile]').should('exist');
  });
  it("Can reach planes page", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-planes]').click();
    cy.url().should('include', '/planes');
    cy.get('[data-cy=planepage]').should('exist');
  });
  it("Can logout", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav_logout]').click();
    cy.get('[data-cy=nav_login]').should('exist');
  });
});

describe("flight testing", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Can add a flight", () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-dashboard]').click();
    cy.get('[data-cy=add_flight]').click();
    cy.get('[data-cy=type_input]').select('Training');
    cy.get('[data-cy=date_input]').type('2022-12-12');
    cy.get('[data-cy=deptime_input]').type('16:00');
    cy.get('[data-cy=arrtime_input]').type('17:45');
    cy.get('[data-cy=plane_input]').type('OO-VMD');
    cy.get('[data-cy=PIC_input]').children().type('Test{downArrow}{enter}');
    cy.get('[data-cy=COPIC_input]').children().type('Lucca{downArrow}{enter}');
    cy.get('[data-cy=departure_input]').type('EBBR');
    cy.get('[data-cy=arrival_input]').type('EBCI');
    cy.get('[data-cy=flight_submit]').click();
    cy.get('[data-cy=flight_table]').should('exist');

    cy.get('[data-cy=flight_date]').should('contain', '12-12-2022');
    cy.get('[data-cy=flight_timeframe]').should('contain', '16:00 - 17:45');
    cy.get('[data-cy=flight_departure]').should('contain', 'EBBR');
    cy.get('[data-cy=flight_arrival]').should('contain', 'EBCI');
    cy.get('[data-cy=flight_type]').should('contain', 'Training');
    cy.get('[data-cy=flight_plane]').should('contain', 'OO-VMD');
  }
  );
  it('Can edit a flight', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-dashboard]').click();
    cy.get('[data-cy=flight_edit]').first().click();
    cy.get('[data-cy=type_input]').select('Local');
    cy.get('[data-cy=flight_submit]').click();
    cy.get('[data-cy=flight_type]').should('contain', 'Local');
  });
});
describe('license testing', () => {
    beforeEach(() => {
      cy.login();
    });
  it('Can add a license', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-dashboard]').click();
    cy.get('[data-cy=add_license]').click();
    cy.get('[data-cy=license_type]').type('PPL');
    cy.get('[data-cy=license_date]').type('2022-12-12');
    cy.get('[data-cy=license_VIY').type('0');
    cy.get('[data-cy=license_submit]').click();
    cy.get('[data-cy=license_info]').should('exist');
    cy.get('[data-cy=license_info_type]').should('contain', 'PPL');
    });
    it('Can remove a license', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=nav-profile]').click();
      cy.get('[data-cy=license_remove]').click();
      cy.get('[data-cy=nav-dashboard]').click();
      cy.get('[data-cy=license_info]').should('not.exist');
    });
  });

describe('plane testing', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Can view a flown plane', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-planes]').click();
    cy.get('[data-cy=plane_reg]').should('contain','OO-VMD');
  });
  it('Can edit a plane', () => {
    let original;
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=nav-planes]').click();
    cy.get('[data-cy=plane_edit]').first().click();
    cy.get('[data-cy=plane_info_type]').type('{selectall}{backspace}Testing plane');
    cy.get('[data-cy=plane_info_submit]').click();
    cy.get('[data-cy=plane_type]').first().should('contain','Testing plane');
    cy.get('[data-cy=plane_edit]').first().click();
    cy.get('[data-cy=plane_info_type]').type('{selectall}{backspace}Evektor');
    cy.get('[data-cy=plane_info_submit]').click();
    cy.get('[data-cy=plane_type]').first().should('contain','Evektor');
  });
});

