export function deleteReservation(id) {
  if (!id) throw new Error("Id can not be empty");
  return fetch(
    `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((deletedReservation) =>
    console.log(deletedReservation)
    );
}
