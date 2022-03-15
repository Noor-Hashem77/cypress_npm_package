import '@testing-library/cypress/add-commands';

const dragAndDrop = (dragSource, dropTarget) => {
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;
  cy.get(dropTarget)
    .first()
    .then($dropTarget => {
      const coordsDrop = $dropTarget[0].getBoundingClientRect();
      cy.get(dragSource)
        .first()
        .then($dragSource => {
          const coordsDrag = $dragSource[0].getBoundingClientRect();
          cy.wrap($dragSource)
            .trigger('mousedown', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true
            })
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true
            });
          cy.get('body')
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true            
            })
            .trigger('mouseup');
        });
    })
};

const _ = {
  dragAndDrop
};

export default _;
