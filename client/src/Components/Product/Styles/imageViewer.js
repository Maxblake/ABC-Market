export default (theme) => ({
    container: {
        padding: `${theme.spacing.unit * 4}px 0px`,
    },
    main: {
        width: 800,
    },
    group: {

    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
});