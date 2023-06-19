namespace API.DTO
{
    public class ChefDTO : BaseDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Views { get; set; }
        public string ImageURI { get; set; }
    }
}
