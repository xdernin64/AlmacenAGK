const getareasdata = async () => {
    const areas = [];
    const snapshot = await getDocs(collection(dbfirestore, "areas"));
    snapshot.forEach((doc) => {
        areas.push(doc.data());
    });
    return areas;
}