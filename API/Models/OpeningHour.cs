namespace API.Models
{
    public class OpeningHour : BaseModel
    {
        public virtual int Day { get; set; }
        public virtual DateTime Opening { get; set; }
        public virtual DateTime Closing { get; set; }
        public virtual Restaurant Restaurant { get; set;}
    }
}
